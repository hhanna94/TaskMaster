import React, {useEffect, useState} from 'react';
import TaskForm from '../components/TaskForm';
import {useParams} from 'react-router'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const EditTask = props => {
    // Pulls the task ID from the URL to be used in the useEffect.
    const {id} = useParams();
    const {users, status, priorities, loggedInUser} = props
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory()

    // Sets the default task information to be passed to the form. This is set during the useEffect.
    const [task, setTask] = useState({})

    // Sets the mode for the form
    const parent = "edit"

    // useEffect to get and set all data for the current task. If the task is successfully retrieved, then the task form can be loaded.
    useEffect( () => {
        axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then(res => {
                setTask(res.data[0])
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    // Logic for what should happen when the user submits the form in edit mode. It should call on the API to update the task in the databse, then go back to the last page the user was on. If back-end validations fail, then set the array of errors to be displayed on the form so the user knows what they did wrong.
    const updateTask = task => {
        axios.put(`http://localhost:8000/api/tasks/${id}`, task)
            .then(res => history.goBack())
            .catch(err => setErrors(err.response.data.errors))
    }
        
    return (
        <div>
            <h3>Edit Task</h3>
            {loaded && <TaskForm loggedInUser={loggedInUser} priorities={priorities} status={status} users={users} onSubmitProp={updateTask} errors={errors} defaultTask={task} parent={parent}/> }
        </div>
    );
};


export default EditTask;