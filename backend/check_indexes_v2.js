require('dotenv').config({ path: __dirname + '/.env' });
const { sequelize } = require('./config/database');

async function checkIndexes() {
  try {
    const tables = ['users', 'mini_sites'];
    for (const table of tables) {
      const [results] = await sequelize.query(`SHOW INDEX FROM ${table}`);
      console.log(`--- Indexes for ${table} ---`);
      results.forEach(res => {
        console.log(`Key_name: ${res.Key_name}, Column_name: ${res.Column_name}, Non_unique: ${res.Non_unique}`);
      });
      console.log(`Total indexes on ${table}:`, results.length);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error checking indexes:', error.message);
    process.exit(1);
  }
}

checkIndexes();
