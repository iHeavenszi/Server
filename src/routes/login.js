const { jsonResponse } = require("../../lib/jsonResponse");
const User = require("../../schema/user");
const bcrypt = require("bcrypt");
const getUserInfo = require("../../lib/getUserInfo");




const router = require("express").Router();

router.post("/",async(req, res)=>{
    
    const {username, password} = req.body;

    if(!!!username || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "datos requeridos"
        }))
    }
    try {
        // buscar al usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if(user){
            const correctPassword = await bcrypt.compare(password, user.password);
            if(correctPassword){
                //autenticar usuario
                 const accessToken = User.createAccessToken(user);
                 const refreshToken = await User.createRefreshToken(user);

                 res.status(200).json(jsonResponse(200,{user: getUserInfo(user), accessToken: accessToken, refreshToken: refreshToken}));

            }else{
                return res.status(401).json(jsonResponse(401,{
                    error: "Usuario o contraseña incorrectos"
                }))
            };
        }
        else{
            return res.status(400).json(jsonResponse(400,{
                error: "usuario no encontrado"
            }))
        };


    } catch (err) {
        console.log(err);
    };

    
    
});

module.exports = router;