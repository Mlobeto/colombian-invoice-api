const axios = require('axios');

class TaxxaService {
  constructor() {
    this.baseUrl = 'https://demo1.taxxa.co/api.djson';
    this.token = null;
    this.tokenExpiry = null; // Fecha de expiración del token
  }

  async login(email, password) {
    const body = {
      jApi: {
        sMethod: "classTaxxa.fjTokenGenerate",
        jParams: {
          sEmail: email,
          sPass: password
        }
      }
    };

    try {
      const response = await axios.post(this.baseUrl, body);
      this.token = response.data.token;
      this.tokenExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // Token válido por 15 días
      return this.token;
    } catch (error) {
      console.error('Error en la autenticación:', error.response ? error.response.data : error.message);
      throw new Error('Error en la autenticación');
    }
  }

  async ensureValidToken() {
    // Si no hay token o está vencido, generamos uno nuevo
    if (!this.token || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      console.log('Token expirado o no disponible. Generando uno nuevo...');
      await this.login(process.env.TAXXA_EMAIL, process.env.TAXXA_PASSWORD);
    }
    return this.token;
  }

  async sendInvoice(body) {
    try {
      const response = await axios.post(this.baseUrl, body);
      return response.data;
    } catch (error) {
      console.error('Error enviando factura a Taxxa:', error.response ? error.response.data : error.message);
      throw new Error('Error enviando factura a Taxxa');
    }
  }
}


module.exports = TaxxaService;



// No ejecutes la función de ejemplo aquí
// Puedes hacer la llamada en el controlador o en otra parte de tu aplicación.

