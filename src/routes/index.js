const express = require('express');
const router = express.Router();
const TaxxaService = require('../services/taxxaService');

const taxxaRoutes = require('./taxxaRoutes');
const taxxaService = new TaxxaService()

router.use('/', taxxaRoutes);

router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extrae email y password del body
    try {
      const token = await taxxaService.login(email, password);
      res.json({ token }); // Envía el token como respuesta
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;

