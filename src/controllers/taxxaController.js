const taxxaService = require('../services/taxxaService');
const { Invoice } = require('../models');

exports.sendInvoice = async (req, res) => {
  const { token: userToken, ...invoiceData } = req.body; // Extraemos el token del usuario y la factura
  let taxxaToken;

  try {
    //  Verificar  token 
    taxxaToken = await taxxaService.ensureValidToken();

    // Verificar si la factura ya existe
    const existingInvoice = await Invoice.findOne({ where: { invoiceNumber: invoiceData.invoiceNumber } });
    if (existingInvoice) {
      return res.status(200).json({ message: 'Factura ya está registrada', existingInvoice });
    }

    // Crear la factura en la base de datos**
    const newInvoice = await Invoice.create(invoiceData);

    //  Preparar el body para Taxxa**
    const taxxaBody = {
      stoken: userToken || taxxaToken, // Usar el token del usuario o el de Taxxa
      jApi: {
        sMethod: "classTaxxa.fjDocumentAdd",
        jParams: {
          // El resto del JSON de tu factura va aquí
          ...invoiceData, 
        }
      }
    };

    // **5. Enviar la factura a Taxxa**
    const taxxaResponse = await taxxaService.sendInvoice(taxxaBody);

    // **6. Actualizar el estado de la factura**
    newInvoice.status = taxxaResponse.status; // Actualizar con el estado devuelto por Taxxa
    await newInvoice.save();

    // **7. Responder al cliente**
    res.json({ taxxaResponse, newInvoice });
  } catch (error) {
    console.error('Error enviando la factura:', error);
    res.status(500).json({ error: 'Error enviando la factura', details: error.message });
  }
};

