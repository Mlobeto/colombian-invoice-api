const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const taxxaRoutes = require('./taxxaRoutes');

router.use('/api', authRoutes);
router.use('/api', taxxaRoutes);

module.exports = router;

