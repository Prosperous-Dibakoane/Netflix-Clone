require('dotenv').config();
const express = require('express');
const session = require('express-session');
const db = require('./models'); // Sequelize
const sequelize = db.sequelize;

const app = express();

const passport = require('./config/passport'); 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ✅ for JSON POST bodies
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/movies')); 

app.get('/', (req, res) => {
  res.render('home', { session: req.session });
});