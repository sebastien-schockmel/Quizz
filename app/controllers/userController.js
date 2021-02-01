const bcrypt = require('bcrypt');

const { User } = require('../models');

const userController = {
    logoutAction: (req, res) => {
        delete req.session.user;

        res.redirect('/');
    },

    loginPage: (req, res) => {
        res.render('login');
    },

    loginAction: (req, res) => {
        // Attention, c'est du POST

        //console.log(req.body);

        // vérifions s'il existe un utilisateur avec cet email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            // attention, on ne récupère pas toujours un objet User (si l'email n'existe pas)
            //console.log(user);

            // si l'utilisateur existe
            if (user) {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (match) {
                        // l'utilisateur existe ET il a donné le bon mot de passe
                        // on va retenir l'identité de l'utilisateur
                        req.session.user = user;

                        // mais on ne retient pas son mot de passe
                        delete req.session.user.password;

                        res.redirect('/');
                    } else {
                        // l'utilisateur existe MAIS il n'a pas donné le bon mot de passe
                        res.render('login', {
                            data: req.body,
                            message: `Identifiants incorrects`
                        });
                    }
                });
            // si l'utilisateur n'existe pas
            } else {
                res.render('login', {
                    data: req.body,
                    message: `Identifiants incorrects`
                });
            }
        });

    }
}

module.exports = userController;