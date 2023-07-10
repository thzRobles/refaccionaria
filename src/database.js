// Configura db
const mongoose = require('mongoose');
// const config = require('./config')

// Conexion
(async () => {
    try {
        // const url = 'mongodb://localhost/refa'
        // const url = 'mongodb+srv://<user>:<password>@cluster0.nu8vp.mongodb.net/'
        const url = 'mongodb://127.0.0.1:27017/refa'
        // const url = 'mongodb+srv://test:tst@cluster0.nu8vp.mongodb.net/?retryWrites=true&w=majority'
        const db = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log("DB connected to", db.connection.name)
    } catch (error) {
        console.error(error);
    }
    // console.log('works')
})();

// mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb+srv://test:tst@cluster0.nu8vp.mongodb.net/?retryWrites=true&w=majority', {
//     useCreateIndex: true,
//     useNewUrlParser: true
// })
// // .then(db => console.log('DB is connected'))
// // .catch(err => console.error(err));