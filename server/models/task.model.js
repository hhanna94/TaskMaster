const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "Must provide a task name."]
    }, 
    description: {
        type: String,
        required: [true, "Must provide a description for the task."]
    },
    dueDate: {
        type: Date,
        required: [true, "Must provide a date."]
    },
    priority: {
        type: String,
        minlength: [3, "Must choose a priority."]
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        minlength: [3, "Must choose someone to assign the task to."]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    history: {
        type: Array,
        default: []
    },
    status: {
        type: String
    }
}, 
    {timestamps: true}
)

module.exports.Task = mongoose.model("Task", TaskSchema)