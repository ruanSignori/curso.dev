const dotenv = require("dotenv");
const { resolve } = require("path");
const { exec } = require("node:child_process");

dotenv.config({
  path: resolve(__dirname, "../.env"),
});

const DB_CONTAINER_NAME=process.env.DB_CONTAINER_NAME;

function checkDatabase() {
  exec(`docker exec ${DB_CONTAINER_NAME} pg_isready --host localhost`, handleReturnMessage);

  function handleReturnMessage(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkDatabase();
      return;
    }

    console.log("\n🟢 Database is ready to accept connections");
  }
}

process.stdout.write("🔴 Waiting for database connections to accept...");
checkDatabase();