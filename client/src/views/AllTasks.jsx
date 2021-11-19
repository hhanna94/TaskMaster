import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AllTasksTable from '../components/AllTasksTable';



const AllTasks = props => {
    const today = new Date().toLocaleDateString('en-CA', {timeZone: 'EST'})
    const { users, status, priorities, loggedInUser } = props
    const [filteredTasks, setFilteredTasks] = useState([])
    const [toggleReload, setToggleReload] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [filter, setFilter] = useState({
        assignTo: loggedInUser._id,
        priority: "All",
        dueDate: today,
        status: "In Progress"
    })

    useEffect(() => {
        setLoaded(false)
        axios.get(`http://localhost:8000/api/tasks/${filter.priority}/${filter.dueDate}/${filter.status}/${filter.assignTo}`)
            .then(res => {
                setFilteredTasks(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [filter, toggleReload])

    const handleFilterUpdate = e => {
        setFilter({...filter, [e.target.name]: e.target.value})
    }


    return (
        <div className="container">
            <h3 className="text-center fw-bold">All Tasks</h3>
            <div className="container w-75">
                <h5>Filters:</h5>
                <div className="ps-5 d-flex flex-wrap justify-content-between align-items-start">
                    <div className="d-flex align-items-center col-6">
                        <label className="me-2 col-3" htmlFor="assignTo">Assign To: </label>
                        <select onChange={handleFilterUpdate} className="form-select py-0 w-50" name="assignTo" id="assignTo" value={filter.assignTo}>
                            <option value="All">All</option>
                            {users.map((user, i) => {
                                return (
                                    <option key={i} value={user._id}>{user.firstName} {user.lastName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="d-flex align-items-center col-6">
                        <label className="me-2 col-2" htmlFor="priority">Priority: </label>
                        <select onChange={handleFilterUpdate} className="form-select py-0 w-50" name="priority" id="priority" value={filter.priority}>
                            <option value="All">All</option>
                            {priorities.map( (priority, i) => {
                            return (
                                <option key={i} value={priority}>{priority}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="d-flex align-items-center col-6 mt-3">
                        <label className="me-2 col-3" htmlFor="dueDate">Due Date:</label>
                        <input onChange={handleFilterUpdate} className="form-control py-0 w-50" type="date" name="dueDate" id="dueDate" value={filter.dueDate}/>
                    </div>
                    <div className="d-flex align-items-center col-6 mt-3">
                        <label className="me-2 col-2" htmlFor="status">Status: </label>
                        <select onChange={handleFilterUpdate} className="form-select py-0 w-50" name="status" id="status" value={filter.status}>
                            {status.map((status, i) => {
                                return (
                                    <option key={i} value={status}>{status}</option>
                                )
                            })}
                            <option value="All">All</option>
                        </select>
                    </div>
                </div>
            </div>
            {loaded && <AllTasksTable toggleReload={toggleReload} setToggleReload={setToggleReload} filteredTasks={filteredTasks} />}
        </div>
    );
};


export default AllTasks;