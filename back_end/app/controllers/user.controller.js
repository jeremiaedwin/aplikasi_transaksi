const UserModel = require("../models/user.model")
const { check, validationResult } = require('express-validator');
const db = require("../models");
const Akun = db.akun;
// Create and Save a transaksi
exports.register = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // Createakun
    const _akun = Akun({
        username: req.body.username,
        active: false,
        email: req.body.email,
        role: "user",
        password: req.body.password
    });
    // Stransaksi in the database
    _akun
        .save(_akun)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating transaksi."
            });
        });
};
// Retrieve all Tutorials from the database.
exports.loginValidate = [ // Check Username
    check('username').isEmail().withMessage('Username Must Be an Email Address').trim().escape().normalizeEmail(),
    // Check Password
    check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()]

exports.registerValidate = [
    check('username').trim().escape(),
    check('email', 'Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),

    check('password').isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];

// Updattransaksi by the id in the request
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    session = req.session;
    session.userid = req.body.username;
    Akun.findOne({ username: req.body.username }, function (err, user) {
        res.send(session)
    })
};