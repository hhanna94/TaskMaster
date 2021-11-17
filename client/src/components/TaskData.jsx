import React from 'react';
import { Link } from 'react-router-dom';

const TaskData = props => {
    const { task } = props
    return (
        <div>
            <div className="d-flex justify-content-between gap-3">
                <div className="mt-3 w-50 border-end pe-3">
                    <h3>Task Details</h3>
                    <div className="d-flex align-items-center mt-4">
                        <p className="col-3"><strong>Title: </strong></p>
                        <p>{task.taskName}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Assigned To: </strong></p>
                        <p className="">{task.assignTo.firstName} {task.assignTo.lastName}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Due Date: </strong></p>
                        <p className="">{new Date(task.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Priority: </strong></p>
                        <p className="">{task.priority}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Status: </strong></p>
                        <p className="">{task.status}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Description: </strong></p>
                        <p className="col-9">{task.description}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3"><strong>Created By: </strong></p>
                        <p className="">{task.createdBy.firstName} {task.createdBy.lastName}</p>
                    </div>
                </div>
                <div className="mt-3 w-50 ps-3">
                    <h3>Task History</h3>
                    <div className="mt-4">
                        {task.history.length > 0 ?
                            task.history.map((description, i) => {
                                return (
                                    <div key={i}>
                                        <p>{description.description}</p>
                                        <p className="ps-5">- {description.editor} on {new Date(description.time).toLocaleDateString('en-US')} {new Date(description.time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</p>
                                    </div>
                                )
                            })
                            : <p>No history available.</p>}
                    </div>
                </div>
            </div>
            <Link to={`/tasks/${task._id}/edit`} className="blue-button button">Edit</Link>
        </div>
    );
};


export default TaskData;