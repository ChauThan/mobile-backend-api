var Text = require('../models').Text;

var text = {
    getAll: function(req, res) {
        res.json({
            message: "All Text"
        });
    },
    get: function(req, res) {
        var id = req.params.id;
        Text.forge({ Id: id })
            .fetch()
            .then(function(entity) {
                res.json(entity);
            });
    },
    create: function(req, res) {
        var body = req.body;
        Text.forge({
                userId: 1,
                text: body.text
            })
            .save()
            .then(function(entity) {
                res.json(entity);
            });
    },
    update: function(req, res) {
        var id = req.params.id;
        Text.forge({
                id: id,
                userId: 1,
                text: body.text
            })
            .save()
            .then(function(entity) {
                res.json(entity);
            });
    },
    delete: function(req, res) {
        var id = req.params.id;
        Text.forge({})
            .where({ id: id })
            .fetch()
            .then(function(entity) {
                entity.destroy()
                    .then(function() {
                        res.json({status: "success"});
                    });
            });
    }
}

module.exports = text;