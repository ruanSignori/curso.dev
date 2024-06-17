import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;")
}

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST"
  });

  expect(response.status).toBe(201); 
});

test("all migrations should runner", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST"
  });

  const listMigrations = await database.query("SELECT COUNT(*) FROM pgmigrations;");
  expect(Number(listMigrations.rows[0].count)).toBeGreaterThan(0); 
})

