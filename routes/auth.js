const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const db = require('../models');
const passport = require('../config/passport');

router.get('/', (req, res) => {
  res.render('home', { session: req.session });
});

router.get("/login", (req, res) => {
  res.render("login");
});