const app = require('./src/app.js');          
const { conn } = require('./src/models');       
const { PORT } = require('./config/envs');
require('dotenv').config();                   

conn.sync({ alter: true }).then(() => {       
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto: ${PORT} 🚀`);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});

