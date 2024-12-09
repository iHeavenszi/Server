// lib/getUserInfo.js
const getUserInfo = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
    };
};

module.exports = getUserInfo;
