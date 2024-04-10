const passport = require('passport');
const local = require('passport-local');
const jwt = require('passport-jwt');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils/hashBcrypt');
const LocalStrategy = local.Strategy;
const GitHubStrategy = require('passport-github2');
const CartManager = require('../dao/db/cart-manager-db');
const cartManager = new CartManager();

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassword = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderhouse'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        }catch(error){
            return done(error);
        }
    }
    ));

    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true, // esto significa que quiere acceder al objeto request
                usernameField: 'email', //el campo que en cambio de username
            },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    const userExists = await UserModel.findOne({ email });
                    if (userExists) return done(null, false);
                    const newCart = await cartManager.createCart();
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        cart: newCart._id,
                        password: createHash(password),
                        role: 'user',
                    };
                    const result = await UserModel.create(newUser);
                    done(null, result);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    const userExists = await UserModel.findOne({ email });
                    if (!userExists) return done(null, false);
                    if (!isValidPassword(password, userExists))
                        return done(null, false);
                    done(null, userExists);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

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
                    passworrd: '', //queda vacio pq es de github
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
// creamos el cookie cookieExtractor
const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['coderCookieToken'];
    }
    return token;
}


module.exports = initializePassword;