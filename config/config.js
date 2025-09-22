// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './fsjstd-restapi.db'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    migrationStorageTableName: "sequelize_meta",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
