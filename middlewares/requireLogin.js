//next: a function will manually call next middleware 105
module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({ error: "You must login in" });
    }
    next();
}