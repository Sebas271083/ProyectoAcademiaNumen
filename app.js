const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth')

const {dbConnection} = require('./db/db');

const app = express();
const session = require('express-session');

//Configuracion express-session
app.use(session({
    secret:'4qWGN?~hX{&p{Lk*',
    resave: false,
    saveUninitialized: false
}))


//Configuracion del servidor

app.set('view engine', 'ejs');
app.use(expressLayouts);


//Carpeta Publica 
app.use(express.static('public'))




app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

const isLogin = (req, res, next) => {
    if(!req.session.user_id) {
        res.redirect('/auth/login')
    }

    next();
}


app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/admin', isLogin, adminRouter);



dbConnection()

module.exports = app;
