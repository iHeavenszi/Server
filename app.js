const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const database = require("./src/database");
const bodyParser = require("body-parser");
const sequelize = require("./src/database");
const authenticate = require("./auth/authenticate"); 
const productsRoutes = require('./src/routes/product'); 
require('dotenv').config();
const Product = require('./schema/products.js');

// Inicializa la aplicación Express
const app = express();

// Configura el puerto
app.set("port", 4000);

// Configura CORS antes de las rutas
app.use(cors({
  origin: 'http://darkysfishshop.com.mx/', // Asegúrate de usar tu dominio aquí
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Middlewares
app.use(bodyParser.json());
app.use(express.json());

// Conexión a la base de datos con Sequelize
async function main() {
    try {
        await sequelize.authenticate();  // Verifica que la conexión esté activa
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}

main().catch(console.error);

// Rutas
app.use("/api/signup", require("./src/routes/signup"));
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/login", require("./src/routes/login.js"));
app.use("/api/user", authenticate, require("./src/routes/user.js"));
app.use("/api/todos", authenticate, require("./src/routes/todos"));
app.use("/api/refresh-token", require("./src/routes/refreshToken"));

// Ruta para obtener productos
app.get('/products', async (req, res) => {
    try {
        const productos = await Product.findAll(); // Obtener productos de la base de datos
        if (!productos || productos.length === 0) {
            return res.status(404).json({ error: 'No hay productos disponibles' });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('hello world');
});

// Usar las rutas de productos
app.use('/api', productsRoutes);

// Iniciar el servidor
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto " + app.get("port"));
});
