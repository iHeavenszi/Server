const { DataTypes } = require("sequelize");
const sequelize = require("../src/database"); // Tu instancia de Sequelize

const Token = sequelize.define("RefreshToken", {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Token;
