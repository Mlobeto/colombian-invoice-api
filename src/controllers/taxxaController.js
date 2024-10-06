const taxxaService = require('../services/taxxaService');
const { Invoice } = require('../models'); 

exports.sendInvoice = async (req, res) => {
  const invoiceData = req.body;

  try {
    // Verificar si la factura ya existe en la base de datos
    const existingInvoice = await Invoice.findOne({ where: { invoiceNumber: invoiceData.invoiceNumber } });
    if (existingInvoice) {
      return res.status(200).json({ message: 'Factura ya está registrada', existingInvoice });
    }

    // Guardar la factura en la base de datos
    const newInvoice = await Invoice.create(invoiceData);

    // Enviar la factura a Taxxa
    const taxxaResponse = await taxxaService.sendInvoice(invoiceData);

    // Actualizar el estado de la factura
    newInvoice.status = taxxaResponse.status;
    await newInvoice.save();

    res.json({ taxxaResponse, newInvoice });
  } catch (error) {
    console.error('Error enviando la factura:', error);
    res.status(500).json({ error: 'Error enviando la factura' });
  }
};
