const router = require("express").Router();

// Definición de la función jsonResponse
function jsonResponse(status, data) {
    return {
        status,
        data,
    };
}

router.get("/", (req, res) => {
    res.status(200).json(jsonResponse(200, req.user));
});

module.exports = router;