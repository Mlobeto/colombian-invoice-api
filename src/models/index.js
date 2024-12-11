require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DEPLOY,
} = require('../../config/envs');

// Configuración de base de datos
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction
  ? new Sequelize(DB_DEPLOY, { logging: false, native: false })
  : new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      logging: false,
      native: false,
    });

const basename = path.basename(__filename);
const modelDefiners = [];

// Ajuste en la ruta: leer archivos desde el mismo directorio 'models'
fs.readdirSync(__dirname)  // Corrección aquí
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, file)));
  });
  console.log(modelDefiners);
// Inyección de la conexión de Sequelize en todos los modelos
modelDefiners.forEach((model) => {
  if (typeof model === 'function') {
    model(sequelize);
  } else {
    console.error("El modelo no es una función:", model);
  }
});

// Capitalización de los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);



// Exportación de modelos y conexión
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};


