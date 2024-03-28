const express = require('express');
const router = express.Router();
const passport = require('passport');

class SessionController {
    async login(req, res) {
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
    }

    async logout(req, res){
        try {
            if (req.session.login) {
                req.session.destroy();
            }
            res.redirect("/login");
    
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async githubcallback(req,res){
        req.session.user = req.user; 
        req.session.login = true; 
        res.redirect("/products");
    }
    
    current(req, res){
        const user = req.session.user;
        res.status(200).json({
            user
        });
    }
}

module.exports = SessionController;