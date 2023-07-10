const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/refa'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
})
.then( ()=> console.log('CONECTADO A MONGO'))
.catch( (e)=> console.log('El error de conexion es: ' + e))