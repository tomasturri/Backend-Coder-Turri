class UserController {
    async register(req, res){

        if(!req.user) return res.status(400).send({status: "error", message: "Credenciales invalidas"});
    
        // req.session.user = {
        //     first_name: req.user.first_name,
        //     last_name: req.user.last_name,
        //     age: req.user.age,
        //     email: req.user.email
        // };
    
        // req.session.login = true;
    
        res.redirect("/login");
    }

    async failedRegister(req, res){
        res.json({message: 'registro fallido'});
    }
}

module.exports = UserController;