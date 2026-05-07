require('dotenv').config({ path: __dirname + '/.env' });
const { sequelize } = require('./config/database');
require('./models/index');

async function testSync() {
  try {
    console.log('Testing sync...');
    // We enable logging to see the queries
    sequelize.options.logging = console.log;
    await sequelize.sync({ alter: true });
    console.log('Sync successful!');
    process.exit(0);
  } catch (error) {
    console.error('Sync FAILED:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.sql);
    }
    process.exit(1);
  }
}

testSync();
