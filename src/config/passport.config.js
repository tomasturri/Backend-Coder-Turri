//note: importamos
const passport = require('passport');
const local = require('passport-local');
const UserModel = require('../dao/models/user.model');
const { createHash , isValidPassword } = require('../utils/hashBcrypt');

const LocalStrategy = local.Strategy;

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
                return done(null, result);
            } catch (error) {
                return done(error);
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
                    return done(null, userExists);
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
};


module.exports = initializePassword;