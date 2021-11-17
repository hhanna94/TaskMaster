import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import TaskData from '../components/TaskData'

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({})
    const [loaded, setLoaded] = useState(false)

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