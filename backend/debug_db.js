require('dotenv').config({ path: __dirname + '/.env' });
const { sequelize } = require('./config/database');

async function debugDatabase() {
  try {
    const [tables] = await sequelize.query('SHOW TABLES');
    const dbName = process.env.DB_NAME;
    const tableKey = `Tables_in_${dbName}`;
    
    for (const tableRow of tables) {
      const tableName = tableRow[tableKey];
      const [indexes] = await sequelize.query(`SHOW INDEX FROM ${tableName}`);
      console.log(`Table: ${tableName} | Index Count: ${indexes.length}`);
      if (indexes.length > 50) {
        console.log(`--- High Index Table Found: ${tableName} ---`);
        indexes.forEach(idx => console.log(`  - ${idx.Key_name}`));
      }
    }
    process.exit(0);
  } catch (error) {
    console.error('Error debugging database:', error.message);
    process.exit(1);
  }
}

debugDatabase();
