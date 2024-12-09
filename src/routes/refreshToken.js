const { generateAccessToken } = require("../../auth/generateTokens");
const getTokenFromHeader = require("../../auth/getTokenFromHeader");
const { verifyRefreshToken } = require("../../auth/verifyTokens");
const Token = require("../../schema/token");


const router = require("express").Router();

router.post("/",async (req, res)=>{
    const refreshToken = getTokenFromHeader(req.headers);

    if(!refreshToken){

        try{
            const found = await Token.findOne({token: refreshToken});
            if (!found){
                return res.status(401).send(jsonResponse(401,{error: "sin autorizacion"}));
            }
            const paylout = verifyRefreshToken(found.token);
            if(paylout){
              const accessToken = generateAccessToken(payload.user);  
              return res.status(200).send(jsonResponse(200,{accessToken}));
            }else{
                return res.status(401).send(jsonResponse(401,{error: "sin autorizacion"}));
            }
        } catch(error){
            return res.status(401).send(jsonResponse(401,{error: "sin autorizacion"}));
        }

    }else{
        return res.status(401).send(jsonResponse(401,{error: "sin autorizacion"}));
    }
    res.send("refresh token");
});

module.exports = router;