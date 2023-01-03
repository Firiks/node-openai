// node includes
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const hbs = require('express-handlebars');

// local files
const routeImg = require('./routes/routeImg');
const routeChat = require('./routes/routeChat');

// constants
const PORT = 5000;

// express instance
const app = express();

// handlebars
app.set('views', path.join(__dirname, 'public'));

app.set( 'view engine', 'hbs' );

app.engine( 'hbs', hbs.engine( {
  extname: 'hbs', 
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/public/layouts/',
  partialsDir: __dirname + '/public/partials/'
} ) );

// handle json
app.use(express.json());

// handle url encoded data
app.use(express.urlencoded({ extended: false }));

// static assets
app.use('/assets', express.static(path.join(__dirname, 'public')));

// index page
app.get('/', (req, res) => {
  res.render('index', {layout : 'layout'});
})

// image route
app.use('/img', routeImg);

// chat route
app.use('/chat', routeChat);

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});