const express =  require('express');
const router =  express.Router();
const CarModel = require('../models/Car')
const createCar = require('../controllers/cars.controller');
const { isObjectIdOrHexString, default: mongoose } = require('mongoose');

// Get create new car page
router.get('/add', (req, res) => {
    res.render('add')
});

// Create new car
router.post('/add', async (req, res) => {
    try {
        const car = CarModel(req.body);
        const carSaved = await car.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

// Get service page
router.get('/addServ/:id', async (req, res) => {
    const car = await CarModel.findById(req.params.id).lean()
    // console.log('ID DEL VEHICULO:', car._id)

    res.render('addServ', { car })
});

// Create new service to car
router.post('/addServ/:id', async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let error;
    // console.log('BODY*****', body)
    servicio = body.servicio
    fecha = body.fecha
    // servicios.forEach(servicio => {
        CarModel.updateOne({_id: id}, {
                $push: {
                    "servicios": {
                        servicio: servicio,
                        fecha: fecha
                    }
                }
            },
            (error) => {
                if(error) {
                    error = error
                }
            }
        )
    // });

    if (error) {
        res.send('ERROR');
    } else {
        res.redirect('/services/' + id)
        // res.redirect('/')
        // res.send('SUCCESS')
    }
});

// Read Services table page
router.get('/services/:id', async (req, res) => {
    const car = await CarModel.findById(req.params.id).lean()
    res.render('services', { car });
});

// Read Index table page
router.get('/', async (req, res) => {
    const cars = await CarModel.find().lean()
    res.render('index', { cars: cars });
});

// Filter cars
router.post('/find', async (req, res) => {
    let body = CarModel(req.body);
    let serie = body.serie
    let car =  await CarModel.find({serie: serie}).lean()
    res.render('index', { cars : car });
});

// Get update cars page
router.get('/edit/:id', async (req, res) => {
    try {
        const car = await CarModel.findById(req.params.id).lean()
        res.render('edit', { car });
    } catch (error) {
    }
});

// Update cars
router.post('/edit/:id', async (req, res) => {
    try {
        await CarModel.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    } catch (error) {
        console.error(error);
    }
});

// Delete car
router.get('/delete/:id', async (req, res) => {
    await CarModel.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

// Delete Service
router.get('/deleteServ/:id', async (req, res) => {
    const id = req.params.id
    // console.log ("ID*************", id)

    const car = await CarModel.findOne({"servicios._id": id}).lean()

    const serv = await CarModel.updateOne(
        {_id: car._id},
        {$pull: {servicios: {_id:mongoose.Types.ObjectId(id)}}}
    ).lean()

    // console.log("SERV*********", serv)

    // res.redirect('/')
    // res.redirect('/services/' + id)
    res.redirect('/services/' + car._id)
});

module.exports = router;