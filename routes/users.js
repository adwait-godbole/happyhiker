const express = require('express')
const router = express.Router();

const users = require('../controllers/users');
const passport = require('passport');

router.get('/register', users.renderRegisterForm);

router.post('/register', users.registerUser);

router.get('/login', users.renderLoginForm);

router.post('/login',passport.authenticate('local',{failureFlash : true, failureRedirect : '/login'}), users.loginUser)

router.get('/logout', users.logoutUser);

module.exports = router;
