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
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
