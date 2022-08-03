// const {validationResult} = require('express-validator')

const { body } = require('express-validator')
const { stringify } = require('postcss')
const sharp = require('sharp')
const {Item} = require('../../models/electrodomesticos')

const create = (req, res) => {
    res.render('admin/productos/create', { layout:'layout-admin'})
}

const index = async (req, res) => {
    try {
        const electro = await Item.find()
        console.log(electro)
        // res.json({electro})
        res.render('admin/productos/index', {productos: electro, layout:'layout-admin'})
        
    } catch (error) {
        console.log(error)
    }
}

const store = async (req, res) => {
    console.log(req.body)
    if(req.body.tipo !== "") {
        try {
            const save = new Item(req.body);
            console.log(`esto es save ${save}`)
            console.log(save.id)
            await save.save()
            sharp(req.file.buffer).resize(300).toFile(`./public/images/producto_${save.id}.jpg`)

        } catch (error) {
            res.status(501).json({msg: "No se puede guardar el Electrodomestico", error})
        }
    }
    res.redirect('/admin/')
}

const edit = async (req, res) => {
    try {
        const electro = await Item.find({_id: {$eq : req.params.id}})
        console.log(electro)
        res.render('admin/productos/edit', { producto: electro[0], id: req.params.id, layout:'layout-admin'}  )
        
    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    const electro = await Item.find()
    let body = req.body
    Item.updateOne({_id: body.id}, {
            $set: {
            tipo: body.tipo,
            marca: body.marca,
            modelo: body.modelo,
            precio: body.precio,
            color: body.color
        }

    },
    function(error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el cliente',
                err
            });
        } else {
            res.redirect('/admin/')
        }
    }

)}

const borrar = async (req, res) => {
    try {
        const electro = await Item.find({_id: {$eq : req.params.id}})
        console.log(`aca... ${electro[0]}`)
        
        await Item.findOneAndDelete({_id: electro[0].id})
        console.log(`electro.id? ${electro[0].id}`)
        res.redirect('/admin/')

    } catch (error) {
        console.log(error)
    }
}

module.exports = {create, index, store, edit, update, borrar}