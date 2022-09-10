const isAdmin = (req, res, next) =>{
    if (req.user.role === "user"){
        res.render("404.html")
    }
    next();
}

module.exports = isAdmin;