const {Item} = require("../models/electrodomesticos")
const validarId = async(req, res, next) => {
    const electro = await Item.findById(req.params.id)
    if(electro !== null) {
        next();
    } else {
        res.json({msg: "El id es invalido"})
    }
}

module.exports = {validarId}