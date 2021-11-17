import React, {useEffect, useState} from 'react';
import TaskForm from '../components/TaskForm';
import {useParams} from 'react-router'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const EditTask = props => {
    const {id} = useParams();
    const {users, status, priorities, loggedInUser} = props
    const [task, setTask] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const parent = "edit"

    useEffect( () => {
        axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then(res => {
                setTask(res.data[0])
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

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