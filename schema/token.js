const { DataTypes } = require("sequelize");
const sequelize = require("../src/database.js"); // Conexión a la base de datos
const User = require("./user.js");

const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "tokens",
    timestamps: false,
});

module.exports = Token;
