//route handlers
//just like api in spring boot
const passport = require("passport");

module.exports = (app) => {
    app.get("/auth/google", passport.authenticate('google', {
            //to tell google, what information we need: user profile and email
            scope: ['profile', 'email']
        })
    )

    //Doing so will lead to a Cannot GET /auth/google/callback problem
    //because passport.authenticate('google') is a middleware 083
    //when finishing passport.authenticate('google') it does nothing
    //so nothing to deal with request
    //app.get("/auth/google/callback", passport.authenticate('google'));

    app.get(
        "/auth/google/callback",
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get("/api/logout", (req, res) => {
        //kill id in session
        req.logOut();
        //req.user destroyed by passport
        res.redirect("/");
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};