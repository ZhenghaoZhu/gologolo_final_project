var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportConf = require('../passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/oauth/google')
.post(passport.authenticate('googleToken', { session : false}));

module.exports = router;
