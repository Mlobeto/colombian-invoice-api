// src/models/index.js
const { Sequelize } = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// Verifica la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Exporta la conexión para ser utilizada en otras partes de tu aplicación
module.exports = { conn: sequelize, sequelize };

