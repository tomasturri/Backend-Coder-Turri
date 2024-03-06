const express = require('express');
const UserModel = require('../dao/models/user.model');
const router = express.Router();
const { createHash } = require('../utils/hashBcrypt'); 
const passport = require('passport');

router.post('/', passport.authenticate("register", {
    failureRedirect: "/register"
}), async (req, res) => {

    if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});

    // req.session.user = {
    //     first_name: req.user.first_name,
    //     last_name: req.user.last_name,
    //     age: req.user.age,
    //     email: req.user.email
    // };

    // req.session.login = true;

    res.redirect("/login");
});

router.post('/',passport.authenticate('register',{
    failureRedirect: '/failedregister'
}), async(req, res)=>{
    if(!req.user) return res.status(400).send({status: 'error', message: 'credenciales invalidas'});

    res.redirect('/login');
});

router.get('failedregister', (req, res)=>{
    res.json({message: 'registro fallido'});
});

module.exports = router;