const axios = require('axios');

class TaxxaService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.taxxa.co';
    this.token = null;
  }

  // Método para autenticar y obtener el token
  async authenticate() {
    try {
      const response = await axios.post(`${this.baseUrl}/auth`, {}, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      this.token = response.data.token;
    } catch (error) {
      console.error('Error al autenticar:', error);
      throw new Error('Authentication failed');
    }
  }

  // Método para enviar una factura
  async sendInvoice(invoiceData) {
    if (!this.token) {
      await this.authenticate();  // Asegúrate de estar autenticado antes de enviar la factura
    }
    
    try {
      const response = await axios.post(`${this.baseUrl}/invoices`, invoiceData, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error enviando la factura:', error);
      throw new Error('Invoice sending failed');
    }
  }
}

// Ejemplo de uso
(async () => {
  const apiKey = 'tu_api_key_aqui';  // Reemplaza esto con tu clave real
  const taxxaService = new TaxxaService(apiKey);

  try {
    const invoiceData = {
      // Estructura de datos de la factura
    };

    const invoiceResponse = await taxxaService.sendInvoice(invoiceData);
    console.log('Factura enviada con éxito:', invoiceResponse);
  } catch (error) {
    console.error('Error en el proceso:', error.message);
  }
})();
