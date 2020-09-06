const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('access_token');
    res.render('home');
});

router.get('/register', (req, res) => {
    res.clearCookie('access_token');
    res.render('register');
});

router.get('/login', (req, res) => {
    res.clearCookie('access_token');
    res.render('login');
})

module.exports = router;