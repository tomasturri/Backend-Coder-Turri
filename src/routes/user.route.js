const express = require('express');
const UserModel = require('../dao/models/user.model');
const router = express.Router();
const { createHash } = require('../utils/hashBcrypt'); 
const passport = require('passport');


// router.post('/',async(req, res)=>{
//     const {first_name, last_name, email, password, age} = req.body;
//     try {
//         const userExists = await UserModel.findOne({email});
//         if(userExists){
//             return res.status(400).send({error: 'email ya registrado'});
//         }
//         const newUser = await UserModel.create(
//             {
//                 first_name, 
//                 last_name, 
//                 email, 
//                 password: createHash(password), 
//                 age
//             });
//         req.session.login = true;
//         req.session.user = {
//             ...newUser._doc
//         }
//         res.status(200).json({
//             message: 'Usuario creado con éxito',
//     });
//     } catch (error) {
//         res.status(400).json({message: 'error al crear el usuario ' + error})
//     }
// });


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