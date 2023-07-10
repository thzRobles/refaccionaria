// EN TEORIA DEBERIA CORRER DESDE AQUI, PERO DA ERROR.

const express =  require('express');
const app =  express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const { urlencoded } = require('express');
const req = require('express/lib/request');


const url = 'mongodb://localhost/refa'
// const url = 'mongodb+srv://test:tst@cluster0.nu8vp.mongodb.net/?retryWrites=true&w=majority'

// Conexion
const db = mongoose.connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
})
.then( ()=> console.log('CONECTADO A MONGODB'))
.catch( (e)=> console.log('El error de conexion es: ' + e))

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Schema
// const carSchema = mongoose.Schema
const carSchema = new mongoose.Schema({
    serie: String,
    placas: String,
    marca: String,
    modelo: String,
    anio: String,
    servicios: [
        {
            procedimiento: String,
            fecha: String
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

// Modelo
// const CarModel = mongoose.model('cars', carSchema )
const CarModel = mongoose.model('cars', carSchema)

// Filtrar
const filtrar = async ()=> {
    const car = await CarModel.find({serie: serie})
    console.log(car)
}

// Mostrar
const mostrar = async ()=> {
    const cars = await CarModel.find()
    console.log(cars)
}

// Crear
const crear = async ()=> {
    const car = new CarModel({
        serie: 'TEST',
        placas: 'TEST',
        marca: 'TEST',
        modelo: 'TEST',
        anio: 'TEST'

    })
    const resultado =  await car.save()
    console.log(resultado)
}

// Llenar
const llenar = async ()=> {
    id = '62930d99365cfc661dd2df24'

    const car = await CarModel.findById({_id: id}).lean()
    // console.log(car.servicios)

    let p = 'p'
    let f = 'f'

    let arr = []
    arr.push(p)
    arr.push(f)

    console.log(arr)

    await CarModel.findByIdAndUpdate(id, req.body)

    console.log(req.body)
    
}

// Editar
const actualizar = async (id)=> {
    const car = await CarModel.updateOne({_id:id},
        {
            $set:{
                modelo: 'city'
            }
        })
}

// Borrar
const eliminar = async (id)=> {
    const car = await CarModel.deleteOne({_id:id})
    console.log(car)
}

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded ({ extended: false }))

// Routes
app.get('/', async (req, res) => {
    const cars = await CarModel.find().lean()
    // console.log(cars)

    res.render('index', { cars: cars });
});

app.get('/services/:id', async (req, res) => {

    const car = await CarModel.findById(req.params.id).lean()
    console.log(car)
    // const serie = cars.find({"serie": "BBB"}).lean()
    // const carss = cars.servicios.find().lean
    // const cars = await CarModel.find({servicios: {$elemMatch: {fecha: "20-06-2020"}}}).lean()

    // const proc = cars[5].servicios[0].procedimiento
    // const fecha = cars[5].servicios[0].fecha

    // const servArr =[]
    // const i = 0;

    // const proc = cars[5].servicios[0].procedimiento
    // const fecha = cars[5].servicios[0].fecha

    // console.log("procedimiento:", proc)
    // console.log("fecha:", fecha)

    // res.render('services', { cars: proc + " " + fecha });
    res.render('services', { car });
    // res.send('hi')
});

app.get('/find/:serie', async (req, res) => {
    
    let serie = req.body.serie;
    console.log('SERIE:', serie)
    let car =  await CarModel.find({serie: serie}).lean()
    res.render('index', { cars : car });
});

app.post('/find', async (req, res) => {
    
    let body = CarModel(req.body);
    let serie = body.serie
    let car =  await CarModel.find({serie: serie}).lean()
    res.render('index', { cars : car });
});

app.post('/add', async (req, res) => {

    const car = CarModel(req.body)
    const carSaved = await car.save()
    // console.log(carSaved)
    // res.send('saved')
    res.redirect('/')
});

app.get('/edit/:id', async (req, res) => {
    try {
        const car = await CarModel.findById(req.params.id).lean()
        res.render('edit', { car });
    } catch (error) {
        // console.log(error.message);
    }
});

app.post('/edit/:id', async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id)
    await CarModel.findByIdAndUpdate(req.params.id, req.body)

    res.redirect('/')
});

app.get('/delete/:id', async (req, res) => {
    await CarModel.findByIdAndDelete(req.params.id)

    res.redirect('/')
})

app.get('/show', async (req, res) => {
    res.send('fields')
})

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(port, () => {
    console.log('Server on port', port)
    // let ip = 'http://192.168.100.160:3000';
    // let host = '192.168.100.160';
    // let miURL = new URL(ip);
});

// Llamadas a procedimientos
// mostrar()
// crear()
// actualizar('6288763fd9dc47c33681450a')
// eliminar('62887a11b7a0ad54b7dd56b9')

llenar()
// *********************************************************

