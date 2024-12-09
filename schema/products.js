// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../src/database'); // Configuración de la base de datos

const Product = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Products', // Nombre de la tabla en la base de datos
  timestamps: false, // Si no tienes los campos createdAt y updatedAt
});

module.exports = Product;
