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

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' // 👈 Forces account selection even if already signed in
  })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Set session values
    req.session.username = req.user.username;
    req.session.email = req.user.email;

    res.redirect('/'); // Or wherever you want
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});