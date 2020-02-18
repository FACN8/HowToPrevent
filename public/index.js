const express = require('express');
const router = express.Router();
const middleware = require('../middlewares')
const game = require('./game');
const home = require('./home');
const auth = require('./auth');
const error = require('./error');

// add home route
router.get('/', middleware.authCheck,home.get);
router.get('/register', auth.registerPage);
router.post('/authenticate', auth.authenticate);
router.post('/addUser', auth.addUser);
router.get('/logout', auth.logout);
router.get('/game', game.get);
router.use(error.client);
router.use(error.server);

module.exports = router;