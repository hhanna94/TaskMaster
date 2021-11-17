import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const CreateTask = props => {
    let today = new Date().toLocaleDateString('en-CA', {timeZone: 'EST'});
    const {loggedInUser, users, status, priorities} = props
    const [errors, setErrors] = useState({})
    const defaultTask = {taskName: "", description: "", dueDate: today, priority: "", assignTo: "", createdBy: loggedInUser._id, status: "In Progress"}
    const history = useHistory();
    const parent = "create"



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