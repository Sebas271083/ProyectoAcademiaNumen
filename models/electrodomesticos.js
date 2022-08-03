const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema( {
    tipo: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
        unique: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    }
})

const Item = mongoose.model('Item', storeSchema);

module.exports = {Item}