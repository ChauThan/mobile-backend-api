var User = require('../models').User;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');

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
                    success: false,
                    message: "Username is already exist"
                });
            }

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);

            User.forge({
                    username: req.body.username,
                    password: hash
                }).save()
                .then(function(user) {
                    res.status(200).json({
                        success: true,
                        token: generateToken(user)
                    });
                });
        });
    },
    login: function(req, res) {
        User.forge({
                username: req.body.username
            })
            .fetch()
            .then(function(user) {
                if (user == null) {
                    return invalid(req, res);
                }

                if (!bcrypt.compareSync(req.body.password, user.get('password'))) {
                    return invalid(req, res);
                }

                var token = jwt.sign(user, 'ABCDEF', {
                    expiresInMinutes: 1440
                });

                return res.json({
                    success: true,
                    token: generateToken(user)
                });
            });
    }
}

function invalid(req, res) {
    res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    });
}

function generateToken(user) {
    return jwt.sign(user, config.token.text, {
        expiresInMinutes: config.token.expiresInMinutes
    });
}

module.exports = auth;