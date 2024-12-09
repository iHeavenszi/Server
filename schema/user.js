const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../src/database.js"); // Importamos la conexión
const { generateRefreshToken, generateAccessToken } = require("../auth/generateTokens.js");
const Token = require("../schema/token.js");
const getUserInfo = require("../lib/getUserInfo.js");  // Asegúrate de usar la ruta correcta


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'users', // Aquí defines el nombre de la tabla en la base de datos
    timestamps: false, // Si tu tabla tiene campos `createdAt` y `updatedAt`
});

// Hook para encriptar la contraseña antes de guardar
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});


User.createAccessToken = (user) => {
    const userInfo = getUserInfo(user); // Usamos el objeto user
    return generateAccessToken(userInfo);
};

User.createRefreshToken = async (user) => {
    const userInfo = getUserInfo(user); // Usamos el objeto user
    const refreshToken = generateRefreshToken(userInfo);
    
    try {
        // Guardamos el refreshToken en la tabla de tokens (suponiendo que tienes una tabla `Token`)
        await Token.create({ token: refreshToken, userId: user.id });
        return refreshToken;
    } catch (error) {
        console.log("Error al guardar el refreshToken:", error);
        throw error;
    }
};

module.exports = User;
