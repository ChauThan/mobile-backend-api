var Text = require('../models').Text;

var text = {
    getAll: function(req, res) {
        Text.forge({})
            .where({
                userId: req.user.id
            })
            .fetchAll()
            .then(function(collections) {
                res.json(collections);
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });

    },
    get: function(req, res) {
        var id = req.params.id;
        Text.forge({
                Id: id,
                userId: req.user.id
            })
            .fetch()
            .then(function (entity) {
                if (entity == null) {
                    res.status(500).json({
                        success: false,
                        message: 'Can not found'
                    });
                } else {
                    res.json({
                        success: true,
                        text: entity
                    });
                }
                
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    },
    create: function(req, res) {
        var body = req.body;
        Text.forge({
                userId: req.user.id,
                text: body.text
            })
            .save()
            .then(function(entity) {
                res.json({
                    success: true,
                    text: entity
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    },
    update: function(req, res) {
        var id = req.params.id;
        Text.forge({
                id: id,
                userId: req.user.id,
                text: req.body.text
            })
            .save()
            .then(function(entity) {
                res.json(entity);
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    },
    delete: function(req, res) {
        var id = req.params.id;
        Text.forge({})
            .where({
                id: id,
                userId: req.user.id
            })
            .fetch()
            .then(function(entity) {
                entity.destroy()
                    .then(function() {
                        res.json({ success: true });
                    })
                    .catch(function(err) {
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    }
}

module.exports = text;