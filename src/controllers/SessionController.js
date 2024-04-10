const express = require('express');
const userDTO = require('../dto/UserDto');

class SessionController {
    async login(req, res) {
        if (!req.user)
            return res
                .status(400)
                .send({ status: 'error', message: 'credenciales invalidas' });
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
        };
        req.session.login = true;
        res.redirect('/products');
    }

    async logout(req, res) {
        try {
            if (req.session.login) {
                req.session.destroy();
            }
            res.redirect('/login');
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async profile(req, res) {
        const { first_name: firstName, last_name: lastName, role } = req.user;
        const userDto = new userDTO(firstName, lastName, role);
        const isAdmin = role === 'admin';
        res.render('/profile', { user: userDto, isAdmin });
    }

    async githubcallback(req, res) {
        req.session.user = req.user;
        req.session.login = true;
        res.redirect('/products');
    }

    async current(req, res) {
        // const user = req.session.user;
        console.log({ sesion: req.session.user });
        const {
            first_name: firstName,
            last_name: lastName,
            role,
        } = req.session.user;
        console.log(firstName, lastName, role);
        const userDto = new userDTO(firstName, lastName, role);
        res.status(200).json({
            userDto,
        });
    }
}

module.exports = SessionController;