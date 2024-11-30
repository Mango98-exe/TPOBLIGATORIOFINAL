const express = require('express');
const Product = require('../backend/models/Product');

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
