const express = require('express');
const router = express.Router();
const taxxaController = require('../controllers/taxxaController');

router.post('/invoices', taxxaController.sendInvoice);

module.exports = router;
