const UserController = require('../controllers/user.controllers')
const {authenticate} = require("../config/jwt")

// Actually performs the API call based on the controller logic.
module.exports = function (app) {
    app.delete('/api/users/:id', UserController.deleteUser)
    app.get('/api/users/loggedInUser', authenticate, UserController.getLoggedInUser)
    app.get('/api/users/logout', UserController.logout)
    app.get('/api/users/:id', UserController.getOneUser)
    app.get('/api/users', UserController.getAllUsers)
    app.post('/api/users', UserController.createUser)
    app.post('/api/login', UserController.login)
    app.put('/api/users/:id', UserController.updateUser)
}