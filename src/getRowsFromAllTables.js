const sqlite3 = require("sqlite3").verbose();

function selectQuery(path) {
  const db = new sqlite3.Database(path);

  db.serialize(() => {
    db.all(
      `SELECT name FROM sqlite_master WHERE type='table'`,
      [],
      (err, tables) => {
        if (err) {
          console.log(`Erro ao obter lista de tabelas: ${err}`);
          db.close(); // fechar conexão se houver erro
          return;
        }

        const promises = tables.map((table) => {
          return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${table.name}`, [], (err, rows) => {
              if (err) {
                console.log(
                  `Erro ao realizar o select na tabela ${table.name}: ${err}`
                );
                reject(err);
              } else {
                if (rows.length === 0) {
                  console.log(
                    `\nNenhuma linha encontrada na tabela ${table.name}!`
                  );
                } else {
                  console.log(`\nLinhas da tabela ${table.name}:\n`);
                  rows.forEach((row) => {
                    console.log(row);
                  });
                }
                resolve();
              }
            });
          });
        });

        Promise.all(promises)
          .then(() => {
            db.close((err) => {
              if (err) {
                console.log(`Erro ao fechar o banco de dados: ${err.message}`);
              }
              console.log(
                "\nConexão com o banco de dados encerrada com sucesso!"
              );
            });
          })
          .catch((err) => {
            console.log(`Erro ao realizar consultas: ${err}`);
            db.close((err) => {
              if (err) {
                console.log(`Erro ao fechar o banco de dados: ${err.message}`);
              }
              console.log(
                "\nConexão com o banco de dados encerrada com sucesso!"
              );
            });
          });
      }
    );
  });
}

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error(
    "Uso: node getRowsFromAllTables.js '<collection.anki21>' OU npm run all '<collection.anki21>'"
  );
  process.exit(1);
}

const filePath = args[0];

selectQuery(filePath);
