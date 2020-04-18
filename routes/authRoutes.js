//route handlers
//just like api in spring boot
const passport = require("passport");

module.exports = (app) => {
    app.get("/auth/google", passport.authenticate('google', {
            //to tell google, what information we need: user profile and email
            scope: ['profile', 'email']
        })
    )

    app.get("/auth/google/callback", passport.authenticate('google'));

    app.get("/api/logout", (req, res) => {
        //kill id in session
        req.logOut();
        //req.user destroyed by passport
        res.send(req.user);
    })


    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};