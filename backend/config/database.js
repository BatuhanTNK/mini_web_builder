const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false
    }
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL bağlantısı başarılı');
  } catch (error) {
    console.error('❌ MySQL bağlantı hatası:', error.message);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Veritabanı tabloları senkronize edildi');
  } catch (error) {
    console.error('❌ Tablo senkronizasyon hatası:', error.message);
    throw error;
  }
};

module.exports = { sequelize, testConnection, syncDatabase };
