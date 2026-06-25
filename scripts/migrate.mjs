// DB 마이그레이션 러너 — 빌드 시 자동 실행.
// migrations/*.sql 을 이름순으로, 아직 적용 안 된 것만 트랜잭션으로 적용하고 _migrations에 기록.
// DATABASE_URL 없으면(로컬/미설정) 조용히 건너뜀 → 로컬 빌드 안전.
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] DATABASE_URL 없음 — 마이그레이션 건너뜀 (로컬/미설정)");
  process.exit(0);
}

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(
    `create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())`,
  );
  const { rows } = await client.query(`select name from _migrations`);
  const done = new Set(rows.map((r) => r.name));

  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  let applied = 0;
  for (const file of files) {
    if (done.has(file)) continue;
    const sql = await readFile(join(migrationsDir, file), "utf8");
    console.log(`[migrate] applying ${file}`);
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query(`insert into _migrations (name) values ($1)`, [file]);
      await client.query("commit");
      applied++;
    } catch (e) {
      await client.query("rollback");
      console.error(`[migrate] FAILED ${file}: ${e.message}`);
      process.exit(1);
    }
  }
  console.log(`[migrate] 완료 — 신규 ${applied}건 / 전체 ${files.length}건`);
} catch (e) {
  // 연결/인증 실패는 빌드를 막지 않음(마이그레이션은 별도로 적용 가능). 경고만.
  // 실제 마이그레이션 SQL 실패는 위 inner catch 에서 exit 1 로 중단됨.
  console.warn(`[migrate] 연결 건너뜀(경고): ${e.message}`);
  process.exit(0);
} finally {
  await client.end().catch(() => {});
}
