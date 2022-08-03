const {validationResult} = require('express-validator');
const {Item} = require('../models/electrodomesticos');
const nodeMailer = require('nodemailer');
const ejs = require('ejs')



const vistaProductos = async (req, res) => {
    try {
        const electro = await Item.find()
        // res.json({electro})
        res.render('productos', {productos: electro})
        
    } catch (error) {
        console.log(error)
    }

}


const producto = async (req, res) => {

    try {
        const electro = await Item.find({_id: {$eq : req.params.id}})
        console.log(electro)
        res.render('show',  { producto: electro[0], id: req.params.id}  )
        

    } catch (error) {
        console.log(error)
    }
}

// const formularioContacto = (req, res) => {
//     res.render('/contacto')
// }


const contacto = (req, res) => {
    res.render('contacto', { values: {} })
}

const enviarForm = (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        const transporter = nodeMailer.createTransport({
            host: process.env.HOST,
            port:process.env.PORT_EMAIl,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        ejs.renderFile(__dirname + '/../views/correo.ejs', { body: req.body }, (error, html) => {
            if (error) { throw error }
            const options = {
                from: req.body.email,
                to: 'correo@correo.com',
                mensaje: req.body.mensaje,
                subject: 'Nodemailer',
                html: html
            }
            transporter.sendMail(options,(error, info) => {
                if (error) {throw error}
    
                console.log(info)
            });
        });


        res.send('Enviando...')
    } else {
        res.render('contacto', { values:req.body, errors: errors.array()})
    }
}






module.exports = {producto, contacto, enviarForm, vistaProductos}