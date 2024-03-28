const express = require('express');
const UserModel = require('../dao/models/user.model');
const router = express.Router();
const { createHash } = require('../utils/hashBcrypt'); 
const passport = require('passport');
const UserController = require('../controllers/UserController');
const userController = new UserController();

router.post('/', passport.authenticate("register", {
    failureRedirect: "/register"
}), (req, res) => userController.register(req, res) );

// router.post('/',passport.authenticate('register',{
//     failureRedirect: '/failedregister'
// }), async(req, res)=>{
//     if(!req.user) return res.status(400).send({status: 'error', message: 'credenciales invalidas'});

//     res.redirect('/login');
// });

router.get('failedregister', (req, res)=> userController.failedRegister(req, res));

module.exports = router;