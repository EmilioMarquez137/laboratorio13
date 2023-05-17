const express = require('express');

const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const tasksRoutes = require('./routes/task');

const app = express();
app.set('port', 3000);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(app.get('port'), ()=>{
    console.log(`Escuchando en el puerto ${app.get('port')}`);
});


app.use(myconnection(mysql,{
    host:'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'crud_db'
}, 'single'));


app.set('views', __dirname+'/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', '.hbs');

app.use('/', tasksRoutes);

app.get('/', (req, res)=>{
    res.render('index');
    console.log('Load');
});