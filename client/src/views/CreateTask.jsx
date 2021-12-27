import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const CreateTask = props => {
    let today = new Date().toLocaleDateString('en-CA', { timeZone: 'EST' });
    const { loggedInUser, users, status, priorities } = props
    const [errors, setErrors] = useState({})
    const history = useHistory();

    // Sets the default task information to be passed to the form.
    const defaultTask = { taskName: "", description: "", dueDate: today, priority: "", assignTo: "", createdBy: loggedInUser._id, status: "In Progress", history: [] }

    // Sets the mode for the form
    const parent = "create"

    // Logic for what should happen when the user submits the form in create mode. It should call on the API to add the task to the database, then go back to the last page the user was on. If back-end validations fail, then set the array of errors to be displayed on the form so the user knows what they did wrong.
    const createTask = task => {
        axios.post('http://localhost:8000/api/tasks', task)
            .then(res => history.goBack())
            .catch(err => setErrors(err.response.data.errors))
    }

return (
    <div>
        <h3>Create a New Task</h3>
        <TaskForm loggedInUser={loggedInUser} priorities={priorities} status={status} users={users} onSubmitProp={createTask} errors={errors} defaultTask={defaultTask} parent={parent} />
    </div>
);
};


export default CreateTask;