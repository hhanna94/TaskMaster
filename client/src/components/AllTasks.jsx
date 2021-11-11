import React from 'react';
import {Link} from 'react-router-dom'

const AllTasks = () => {
    return (
        <div className="container">
            <h3 className="text-center fw-bold">All Tasks</h3>
            <div className="container w-75">
                <h5>Filters:</h5>
                <div className="ps-5 d-flex flex-wrap justify-content-between align-items-start">
                    <div className="d-flex align-items-center col-6">
                        <label className="me-2 col-3" htmlFor="assignedTo">Assigned To: </label>
                        <select className="form-select py-0 w-50" name="assignedTo" id="assignedTo">
                        <option value="All">All</option>
                            <option value="Heather">Heather</option>
                            <option value="Buttface">Buttface</option>
                            <option value="YourMom">Your Mom</option>
                            <option value="Boo">Boo</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center col-6">
                        <label className="me-2 col-2" htmlFor="priority">Priority: </label>
                        <select className="form-select py-0 w-50" name="priority" id="priority">
                            <option value="All">All</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center col-6 mt-3">
                        <label className="me-2 col-3" htmlFor="dueDate">Due Date:</label>
                        <input className="form-control py-0 w-50" type="date" name="dueDate" id="dueDate" />
                    </div>
                    <div className="d-flex align-items-center col-6 mt-3">
                        <label className="me-2 col-2" htmlFor="status">Status: </label>
                        <select className="form-select py-0 w-50" name="status" id="status">
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center col-6 mt-3">
                        <label className="me-2 col-3" htmlFor="department">Department: </label>
                        <select className="form-select py-0 w-50" name="department" id="department">
                            <option value="All">All</option>
                            <option value="Accounting">Accounting</option>
                            <option value="Operations">Operations</option>
                        </select>
                    </div>
                </div>
            </div>
            <table className="mt-5 container w-75 table table-striped table-bordered border-dark text-center align-middle">
                <thead>
                    <tr>
                        <td>Task Name</td>
                        <td>Due Date</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Assigned To</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Plycon Priority</td>
                        <td>11/10/21</td>
                        <td>High</td>
                        <td>In Progress</td>
                        <td>Heather</td>
                        <td><Link className="button blue-button" to="/tasks/id">View/Edit</Link></td>
                    </tr>
                    <tr>
                        <td>Plycon Tracking</td>
                        <td>10/11/21</td>
                        <td>Medium</td>
                        <td>In Progress</td>
                        <td>Bologna</td>
                        <td><Link className="button blue-button" to="/tasks/id">View/Edit</Link></td>
                    </tr>
                    <tr>
                        <td>Modern Tracking</td>
                        <td>10/11/21</td>
                        <td>Low</td>
                        <td>In Progress</td>
                        <td>Mr. Buttface</td>
                        <td><Link className="button blue-button" to="/tasks/id">View/Edit</Link></td>
                    </tr>
                    <tr>
                        <td>Don Farr Priority</td>
                        <td>10/12/21</td>
                        <td>High</td>
                        <td>In Progress</td>
                        <td>Heather</td>
                        <td><Link className="button blue-button" to="/tasks/id">View/Edit</Link></td>
                    </tr>
                    <tr>
                        <td>Plycon Tracking</td>
                        <td>10/11/21</td>
                        <td>Medium</td>
                        <td>In Progress</td>
                        <td>Boo</td>
                        <td><Link className="button blue-button" to="/tasks/id">View/Edit</Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


export default AllTasks;