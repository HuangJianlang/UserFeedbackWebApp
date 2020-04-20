const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecreteKey);
//use my middleware
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    //express app will accept a lot of func as middlewares and one of them should deal with http request
    //deal with post method
    app.post("/api/stripe", requireLogin, async (req, res) => {
        //post will not parse request body
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            description: "Add credits for 5 emails",
            source: req.body.id
        });
        //when use passport, req.user will be the current login model
        req.user.credits += 5;
        //using await here to prevent async or send old user data back to client
        const user = await req.user.save();
        res.send(user)
    });
};