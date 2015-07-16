var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var text = require('./text.js');

// public routes 
router.get('/', auth.index);
router.post('/regist', auth.regist);
router.post('/login', auth.login);

// Text
router.get('/api/texts', text.getAll);
router.get('/api/text/:id', text.get);
router.post('/api/text/', text.create);
router.put('/api/text/:id', text.update);
router.delete('/api/text/:id', text.delete);

module.exports = router;