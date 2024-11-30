const express = require('express');
const Cart = require('../backend/models/Cart');
const Product = require('../backend/models/Product');

const router = express.Router();

// Ruta para obtener el carrito del usuario (por ejemplo, con userId)
router.get('/cart/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para agregar un producto al carrito
router.post('/cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Si no existe el carrito, creamos uno nuevo
            cart = new Cart({ userId, items: [] });
        }
        // Buscar el producto y agregarlo al carrito
        const product = await Product.findById(productId);
        if (product) {
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity; // Si existe, sumamos la cantidad
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/cart/:userId/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            const updatedItems = cart.items.filter(item => item.productId.toString() !== req.params.productId);
            cart.items = updatedItems;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
