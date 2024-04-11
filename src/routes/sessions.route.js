// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const SessionController = require('../controllers/SessionController');
// const sessionController = new SessionController();
// const { adminEmail, adminPassword } = require('../config/config');

// const isAdmin = (req, res, next) => {
//     const { email, password } = req.body;
//     const adminUser = {
//         username: 'admin',
//         first_name: 'admin',
//         last_name: 'admin',
//         age: 'Private',
//         email: adminEmail,
//         password: adminPassword,
//         role: 'admin',
//     };
//     if (email === adminEmail && password === adminPassword) {
//         req.session.login = true;
//         req.session.user = { ...adminUser };
//         res.redirect('/products');
//         return;
//     }
//     next();
// };

// router.post(
//     '/login',
//     isAdmin,
//     passport.authenticate('login', {
//         failureRedirect: 'api/sessions/faillogin',
//     }),
//     (req, res) => sessionController.login(req, res)
// );

// router.get('/profile', (req, res) => sessionController.profile(req, res));

// router.get('/logout', (req, res) => sessionController.logout(req, res));

// router.get('faillogin', async (req, res) => {
//     res.json({ message: 'fallo la estrategia' });
// });

// // Login con github

// router.get(
//     '/github',
//     passport.authenticate('github', { scope: ['user:email'] }),
//     async (req, res) => {}
// );

// router.get(
//     '/githubcallback',
//     passport.authenticate('github', { failureRedirect: '/login' }),
//     (req, res) => sessionController.githubcallback(req, res)
// );

// router.get(
//     '/current',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => sessionController.current(req, res)
// );

// module.exports = router;

//