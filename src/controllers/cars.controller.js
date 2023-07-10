const CarModel = require('../models/Car')

const createCar = async (req, res) => {
    try {
        const car = CarModel(req.body);
        const carSaved = await car.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

const renderCars = async (req, res) => {
    const cars = await CarModel.find().lean()
    res.render('index', { cars: cars });
};

module.exports = createCar;
