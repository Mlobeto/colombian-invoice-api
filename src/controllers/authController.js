const taxxaService = require('../services/taxxaService');

exports.authenticate = async (req, res) => {
  try {
    const token = await taxxaService.authenticate(); // Llamas al servicio de Taxxa para obtener el token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    res.status(500).json({ error: 'Error durante la autenticación' });
  }
};
