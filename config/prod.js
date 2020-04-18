// this is production keys
module.exports = {
    //no lower case for id
    googleClientID: process.env.GOOGLE_ClIENT_ID,
    googleClientSecret: process.env.GOOGLE_ClIENT_SECRET,
    //mogoose:
    mongooseURI: process.env.MONGOOSE_URI,
    //cookie key
    cookieKey: process.env.COOKIE_KEY
}

