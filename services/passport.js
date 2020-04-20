const keys = require("../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy =  require("passport-google-oauth20").Strategy;

//Load user collection(or model) that is already created
const User = mongoose.model('users');

//serializeUser setting id in cookie
passport.serializeUser((user, done) => {
    //user.id is the id in record, not googleId
    //because not every user enter by googleId
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {done(null, user)});
});


const callbackFunc = async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
    if (existingUser) {
        return done(null, existingUser)
    }
    const newUser = await new User({googleId: profile.id}).save();
    return done(null, newUser);
}

//new a instance of a strategy
// passport.use(
//     'google',
//     new GoogleStrategy({
//         clientID: keys.googleClientID,
//         clientSecret: keys.googleClientSecret,
//         //routh that google redirect to(need to defined by myself)
//         callbackURL: "/auth/google/callback",
//         //fix redirect to https instead of http (v050)
//         proxy: true
//     },
//     //after get permission from user, google send accessToken and get all information we want
//     (accessToken, refreshToken, profile, done) => {
//         //return a promise
//         User.findOne({ googleId: profile.id}).then((existingUser) => {
//             if(existingUser){
//                 //do things
//                 //first argument err, second is user record
//                 done(null, existingUser);
//             }else {
//                 //create a new record and save to model
//                 new User({googleId: profile.id})
//                     .save()
//                     .then((user) => done(null, user))
//             }
//         })
//     })
// );

//refactored code
passport.use(
    'google',
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            //routh that google redirect to(need to defined by myself)
            callbackURL: "/auth/google/callback",
            //fix redirect to https instead of http (v050)
            proxy: true
        },
        callbackFunc
    )
);