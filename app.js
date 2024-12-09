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

async function main() {
    try {
        // Verifica la conexión y sincroniza los modelos
        await sequelize.authenticate();  // Verifica que la conexión esté activa
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}

main().catch(console.error);




const app = express();
app.set("port", 4000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//rutas
app.use("/api/signup", require("./src/routes/signup"));
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/login", require("./src/routes/login.js"));
app.use("/api/user", authenticate, require("./src/routes/user.js"));
app.use("/api/todos", authenticate, require("./src/routes/todos"));
app.use("/api/refresh-token", require("./src/routes/refreshToken"));


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
app.get('/', (req, res) => {
    res.send('hello world')
});



app.use('/api', productsRoutes);



//Iniciar servidor
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto " + app.get("port"));
  });