const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

//GOOGLE STRATEGY

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID : '1017674360338-f7t0rikrqvi5nfruo2smnhgtlkj3lo6l.apps.googleusercontent.com',
    clientSecret : 'Py1n0_sjzit-EBsPuxZ9g2pF'

}, async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile)
}));