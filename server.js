const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');

const ctrl = require('./controllers/carCtrl');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.redirect('/cars')
});

app.use('/cars', ctrl);


app.listen(PORT, () => {
    console.log(`This server is running on ${PORT}`)
})
