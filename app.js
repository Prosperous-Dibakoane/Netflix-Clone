require('dotenv').config();
const express = require('express');
const session = require('express-session');
const db = require('./models'); // Sequelize
const sequelize = db.sequelize;

const app = express();

const passport = require('./config/passport'); 