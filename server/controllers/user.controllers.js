const { User } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {secret} = require("../config/jwt")

// Query the database to create a user. First it will verify if the user already exists, by searching to see if any users have that email. If it does exist, then return a JSON with the userExists error to be displayed on the front end. Otherwise, actually attempt to create the user, returning the newly created user if successful, and returning a list of errors if validations fail.
module.exports.createUser = (req, res) => {
    User.find({ email: req.body.email })
        .then(users => {
            if (users.length > 0) {
                res.json({ userExists: "Email is already in use." })
            } else {
                User.create(req.body)
                    .then(newUser => res.json(newUser))
                    .catch(err => res.status(400).json(err))
            }
        })
}

// Query the database to delete a user. If successful, returns a JSON of the deleted user.
module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deletedUser => res.json(deletedUser))
        .catch(err => console.log(err))
}

// Query the database to get and return a list of all users.
module.exports.getAllUsers = (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => console.log(err))
}

// Query the database to get and return a user.
module.exports.getOneUser = (req, res) => { 
    User.find({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => console.log(err))
}

// Query the database to update a user. If it passes validations, return a JSON of the updated user, otherwise return a JSON of the errors.
module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err))
}

// Query the database to login a user. First, it will look to see if the email is valid. If not, it will return a JSON with the invalidAttempt message. If the email is valid, it will then check if the password is correct. If the password is correct, then it will create a usertoken cookie with a JWT and a message that login was successful. Otherwise, it will return a JSON with the invalidAttempt messsage.
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

// Query the database to get the logged in user's information. It will decode the JWT to get the user information, then query the database to return a JSON of the user.
module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
    User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

// Logs the user out by clearing the JWT from cookies.
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}