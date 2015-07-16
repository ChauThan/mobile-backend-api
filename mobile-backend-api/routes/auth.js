var User = require('../models').User;
var bcrypt = require('bcrypt');

var auth = {
    index: function(req, res) {
        res.status(200).json({
            message: "Welcome to Mobile Back End Api"
        });
    },
    regist: function(req, res) {
        User.forge({
            username: req.body.username
        }).fetch()
        .then(function(entity) {
            if (entity != null) {
                res.status(200).json({
                    status: "error",
                    message: "Username is already exist"
                });
            }

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);

            User.forge({
                    username: req.body.username,
                    password: hash
                }).save()
                .then(function (user) {
                    delete user.attributes.password;
                    res.status(200).json({
                        status: "success",
                        user: user
                    });
                });

        });
    },
    login: function(req, res) {
        res.status(200).json({
            status: "success",
            message: "login"
        });
    }
}

module.exports = auth;