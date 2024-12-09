function getTokenFromHeader(headers) {
 if (headers && headers.authorization){
     const token = headers.authorization.split(' ');
     if (token.length === 2){
         return token[1];
     }else {
        return null;
     }
 }else {
     return null;
 }
}

module.exports = getTokenFromHeader;