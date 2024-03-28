const express = require('express');
const router = express.Router();
const passport = require('passport');
const SessionController = require('../controllers/SessionController');
const sessionController = new SessionController();

router.post('/login', passport.authenticate('login', {
    failureRedirect: 'api/sessions/faillogin'
}), (req, res) => sessionController.login(req, res));

router.get('/logout',(req, res) => sessionController.logout(req, res));

router.get('faillogin', async (req, res) => {
    res.json({message: 'fallo la estrategia'});
});

// Login con github

router.get('/github', passport.authenticate('github', {scope: ['user:email']}) ,async(req, res)=>{
});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => sessionController.githubcallback(req, res) );

router.get('/current', (req, res)=> sessionController.current(req, res));

module.exports = router;