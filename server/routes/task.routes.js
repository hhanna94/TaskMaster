const TaskController = require('../controllers/task.controllers')

// Actually performs the API call based on the controller logic.
module.exports = function (app) {
    app.post('/api/tasks', TaskController.createTask)
    app.get('/api/tasks/users/:id', TaskController.viewMyOpenTasks)
    app.get('/api/tasks/:id', TaskController.getOneTask)
    app.put('/api/tasks/:id', TaskController.updateTask)
    app.get('/api/tasks/:priority/:dueDate/:status/:assignTo', TaskController.getFilteredTasks)
}                                   
