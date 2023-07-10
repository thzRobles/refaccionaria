const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const carSchema = new Schema({
    serie: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    placas: String,
    marca: String,
    modelo: String,
    anio: String,
    servicios: [
        {
            servicio: String,
            fecha: String,
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Car', carSchema)