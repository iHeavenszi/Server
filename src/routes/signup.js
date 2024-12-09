const { jsonResponse } = require("../../lib/jsonResponse");
const User = require("../../schema/user");


const router = require("express").Router();

router.post("/",async (req, res)=>{
    const {username, name, password} = req.body;

    if(!!!username || !!!name || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "datos requeridos"
        }))
    }

    try {
        // Crear un nuevo usuario usando el modelo de Sequelize
        const newUser = await User.create({ username, name, password });

        return res.status(201).json(
            jsonResponse(201, {
                message: "Usuario creado exitosamente.",
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    name: newUser.name,
                },
            })
        );
    } catch (error) {
        console.error("Error al crear el usuario:", error);

        // Manejo de errores de Sequelize, como el campo `username` duplicado
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json(
                jsonResponse(409, { error: "El nombre de usuario ya está en uso." })
            );
        }

        return res.status(500).json(
            jsonResponse(500, { error: "Error interno del servidor." })
        );
    }
});

module.exports = router;