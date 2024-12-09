// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../../schema/products'); // Importamos el modelo Producto

// Ruta para obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
      const productos = await Product.findAll();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  module.exports = router;