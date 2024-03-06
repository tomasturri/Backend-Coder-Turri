const passport = require('passport');
const local = require('passport-local');
const UserModel = require('../dao/models/user.model');
const { createHash , isValidPassword } = require('../utils/hashBcrypt');
const LocalStrategy = local.Strategy;
const GitHubStrategy = require('passport-github2');

const initializePassword = ()=>{
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, // esto significa que quiere acceder al objeto request
        usernameField: 'email' //el campo que en cambio de username
        },
        async (req, username, password, done)=>{
            const {first_name, last_name, email,age} = req.body;
            try {
                const userExists = await UserModel.findOne({email});
                if(userExists) return done(null, false);
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'user'
                }
                const result = await UserModel.create(newUser);
                done(null, result);
            } catch (error) {
                done(error);
            }
        }));
    passport.use('login', 
        new LocalStrategy(
            {usernameField: 'email'},
            async (email, password, done)=>{
                try {
                    const userExists = await UserModel.findOne({email});
                    if(!userExists) return done(null, false);
                    if(!isValidPassword(password, userExists)) return done(null, false);
                    done(null, userExists);
                } catch (error) {
                    done(error);
                }
            }
        ));

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done)=>{
        let user = await UserModel.findById({_id: id});
        done(null, user);
    });

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.272379dc777864ba',
        clientSecret: 'f818101992c8d0ac466fe27ff73695d404d6ca61',
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ email: profile._json.email });
            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    passworrd: '', //password lo maneja github por eso lo dejamos vacio
                    role: 'user'
                }
                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user); // si encuentro el user, lo retorno en el done
            }
        } catch (error) {
            done(error);
        }
    }));
};


module.exports = initializePassword;