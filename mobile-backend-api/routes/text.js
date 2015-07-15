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
                UserId: 1,
                Text: body.text
            })
            .save()
            .then(function(entity) {
                res.json(entity);
            });
    },
    update: function(req, res) {
        var id = req.params.id;
        Text.forge({
                Id: id,
                UserId: 1,
                Text: body.text
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
                        res.json({success: "true"});
                    });
            });
    }
}

module.exports = text;