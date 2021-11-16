const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Must provide a first name that is at least 2 characters."],
        minlength: [2, "First name must be at least 2 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Must provide a last name that is at least 2 characters."],
        minlength: [2, "Last name must be at least 2 characters."]
    },
    department: {
        type: String,
        minlength: [3, "Must choose a department."]
    },
    email: {
        type: String,
        required: [true, "Must provide an email."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Must provide a valid email."]
    },
    password: {
        type: String,
        required: [true, "Must provide a password."],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be at least 8 characters, have at least one letter, one number, and one special character"]
    },
    admin: {
        type: Boolean
    },
},
    { timestamps: true }
)

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("hashing failed tho! now what! 20 minute rule?", err)
            next();
        })
})


module.exports.User = mongoose.model("User", UserSchema)