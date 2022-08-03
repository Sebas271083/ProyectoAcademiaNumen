const express = require('express');
const router = express.Router();
const {vistaProductos, producto, contacto, enviarForm, login} = require('../controller/controller.js')
const {validarId} = require('../middeleware/validarId.js')
const axios = require('axios')

// router.get('/ver', vistaElectro)
const { body, validationResult, check} = require('express-validator')

router.get('/', async (req, res) => {
    try {
        const ciudad = 'Buenos Aires'
        const appId = '4a82dce44d60f84db126afbe6d3fd1da'
        const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},AR&appid=${appId}`)
        // res.json(respuesta)
        console.log(respuesta.data.name)
        res.render('index', {respuesta: respuesta})

    } catch (error) {
        console.log(error)
    }
})

router.get('/productos', vistaProductos )
router.get('/productos/:id',validarId,producto)



router.get('/contacto', contacto)
router.post('/contacto', [
    body('email', 'El correo es obligatorio').exists().isEmail().normalizeEmail(),
    check('nombre')
        .exists()
        .withMessage('El mensaje es obligatorio')
        .isLength(5)
        .withMessage('El nombre debe ser mayor a 5 caracteres')
        .escape(),
    body('apellido', 'El apellido es obligatorio').exists().escape(),
    body('direccion', 'La dirección es obligatoria').exists().escape(),
    body('codigoPostal', 'El codigo Postal es obligatorio').exists().escape(),
    body('mensaje', 'El mensaje es obligatorio y debe tener como minimo 10 caracteres').exists().isLength(10).trim().escape()

], enviarForm)







module.exports = router