const { User } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {secret} = require("../config/jwt")

module.exports.createUser = (req, res) => {
    User.find({ email: req.body.email })
        .then(users => {
            if (users.length > 0) {
                res.json({ userExists: "Email is already in use." })
            } else {
                User.create(req.body)
                    .then(newUser => {
                        console.log(newUser)
                        res.json(newUser)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json(err)
                    })
            }
        })
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deletedUser => res.json(deletedUser))
        .catch(err => console.log(err))
}

module.exports.getAllUsers = (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => console.log(err))
}

module.exports.getOneUser = (req, res) => { 
    User.find({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => console.log(err))
}

module.exports.login = (req, res) => {
    let invalidAttempt = {invalidAttempt: "Invalid username/password."}
    User.findOne({email: req.body.email})
        .then( user => {
            if (user === null) {
                res.json(invalidAttempt)
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordIsValid => {
                        if (passwordIsValid) {
                            res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                            .json({msg: "success!", user: user})
                        } else {
                            res.json(invalidAttempt)
                        }
                    })
                    .catch(err => res.json(invalidAttempt))
            }
        })
        .catch(err => res.json(err))
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    // res.clearCookie('usertoken');
    // res.sendStatus(200);
    res.cookie("usertoken", jwt.sign({_id:""}, secret), {
        httpOnly: true,
        maxAge: 0
    }).json({msg:"ok"})
}