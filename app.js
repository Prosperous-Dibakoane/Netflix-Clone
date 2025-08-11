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
