// Configura app
const express =  require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const indexRoutes = require('./routes/index.routes');

// Initialization 
const app =  express();


// app.set('port', process.env.PORT || 3000);

// Settings
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes)

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
