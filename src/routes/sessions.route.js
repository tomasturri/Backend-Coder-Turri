const express = require('express');
const userModel = require('../dao/models/user.model');
const router = express.Router();
const { isValidPassword } = require('../utils/hashBcrypt');
const passport = require('passport');


router.post('/login', passport.authenticate('login', {
    failureRedirect: 'api/sessions/faillogin'
}), async (req, res)=>{
    if(!req.user) return res.status(400).send({status: 'error', message: 'credenciales invalidas'});
    if(req.user.email === 'adminCoder@coder.com'){
            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                age: req.user.age,
                role: 'admin'
            };
    }else{
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        };
    }
    req.session.login = true;
    res.redirect('/products');
});

router.get('/logout',(req, res)=>{
    try {
        if (req.session.login) {
            req.session.destroy();
        }
        res.redirect("/login");

    } catch (error) {
        res.status(500).json({message: error});
    }
});

router.get('faillogin', async (req, res) => {
    res.json({message: 'fallo la estrategia'});
});

// Login con github

router.get('/github', passport.authenticate('github', {scope: ['user:email']}) ,async(req, res)=>{
});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/products");
});

module.exports = router;
