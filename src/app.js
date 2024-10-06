const express = require('express');
const app = express();
const routes = require('./routes'); // Importamos las rutas desde el index de rutas
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(routes); // Usamos las rutas

module.exports = app;

