const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const db = require('../models');
const passport = require('../config/passport');