var config = require('../config');
var knex = require('knex')(config.db);

var bookshelf = require('bookshelf')(knex);

exports.User = bookshelf.Model.extend({
    tableName: 'users'
});

exports.Text = bookshelf.Model.extend({
    tableName: 'texts'
});