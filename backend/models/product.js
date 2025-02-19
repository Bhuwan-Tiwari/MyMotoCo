const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sku_code: { type: DataTypes.STRING, unique: true, allowNull: false },
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    hsn_code: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Product;
