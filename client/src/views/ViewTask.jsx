import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import TaskData from '../components/TaskData'

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({})
    const [loaded, setLoaded] = useState(false)

    // useEffect to get the task data that needs to be passed down to the child component which will only be displayed after the useEffect is successfully run.
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tasks/${id}`)
            .then(res => {
                setTask(res.data[0])
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="container w-50">
            {loaded && <TaskData task={task}/>}
        </div>
    );
};


export default ViewTask;