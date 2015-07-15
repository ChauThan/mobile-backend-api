var config = require('../config');
var knex = require('knex')(config.db);

var bookshelf = require('bookshelf')(knex);

exports.User = bookshelf.Model.extend({
    tableName: 'Users'
});

exports.Text = bookshelf.Model.extend({
    tableName: 'Texts'
});