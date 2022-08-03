const express = require('express');
const router = express.Router();
const {create, store, edit, borrar} = require('../controller/admin/productos.js');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const sharp = require('sharp')

const controller = require('../controller/admin/productos');

const { route } = require('./api');


router.get('/', controller.index)
router.get('/productos/create', controller.create )

router.post('/productos/store', upload.single('imagen'), controller.store)

router.get('/productos/:id/edit', controller.edit)
router.put('/productos/update', controller.update)

router.delete('/productos/:id/delete', controller.borrar)


module.exports = router;