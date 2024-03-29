const { Task } = require("../models/task.model")

// Query the database to create a task. If it passes validation, return a JSON of the task, otherwise return a JSON of the validation errors.
module.exports.createTask = (req, res) => {
    Task.create(req.body)
        .then(newTask => res.json(newTask))
        .catch(err => res.status(400).json(err))
}

// Query the database to return the user's open tasks (using their ID and and returning any tasks that have a status of In Progress). 
module.exports.viewMyOpenTasks = (req, res) => {
    Task.find({ assignTo: req.params.id, status: "In Progress" })
        .then(openTasks => res.json(openTasks))
        .catch(err => console.log(err))
}

// Query the database to return a task based on the task ID, containing a user object for the assignTo and createdBy fields.
module.exports.getOneTask = (req, res) => {
    Task.find({ _id: req.params.id }).populate("assignTo").populate("createdBy")
        .then(task => res.json(task))
        .catch(err => console.log(err))
}

// Query the database to update a task. If it passes validation, return a JSON of the updated task, otherwise return a JSON of the validation errors.
module.exports.updateTask = (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.status(400).json(err))
}

// Query the database to get a list of tasks that that meet the filter criteria.
module.exports.getFilteredTasks = (req, res) => {
    // Make an object that is a copy of the filters passed in as parameters in the API call.
    let filters = { ...req.params }

    // If the priority or status filters are set to "All", then we do not want to include that in our Find, so we should delete it from our filters object.
    if (filters.priority === "All") {
        delete filters.priority
    }
    if (filters.status === "All") {
        delete filters.status
    }

    // Delete the assignTo property from the filters object because it is a user filter, not a task filter and we need to handle it elsewhere.
    delete filters.assignTo

    // Create an assignToFilter object that will be used to fill in the assignTo property of each task. If the filter is "All", then we do not need a query (match). If the filter is a user and not "All", then we need to query the user's database and fill in the assignTo property only if the _id matches the filter. Otherwise, it will assign assignTo as null.
    let assignToFilter = { path: "assignTo" }
    if (req.params.assignTo !== "All") {
        assignToFilter.match = { _id: req.params.assignTo }
    }

    // Query MongoDB to find all tasks that meet the filters criteria determined above, and populate the assignTo field as either null or an object with the user data that matches the _id given -- determined above.
    Task.find(filters).populate(assignToFilter)
        .then(tasks => {
            // At this point, we need to filter out any data that has an assignTo value of null, as they should be excluded from the task list -- they do not meet the filter criteria. Once that's done, send it to the front end.
            let filteredTasks = tasks.filter(task => task.assignTo !== null)
            res.json(filteredTasks)
        })
        .catch(err => console.log(err))
}
