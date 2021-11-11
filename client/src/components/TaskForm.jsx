import React from 'react';

const TaskForm = () => {
    return (
        <div className="container">
            <h3>Create a New Task</h3>
            <form className="mt-4 container w-25">
                <div className="d-flex justify-content-center mb-3">
                    <label for="taskName" className="col-sm-4 col-form-label">Task Name: </label>
                    <input type="password" className="form-control col-sm-8" id="taskName" name="taskName" />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <label for="dueDate" className="col-sm-4 col-form-label">Due Date: </label>
                    <input type="date" className="form-control col-sm-8" id="dueDate" name="dueDate" />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <label for="priority" className="col-sm-4 col-form-label">Priority: </label>
                    <select name="priority" id="priority" className="form-select col-sm-8">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <label for="assignedTo" className="col-sm-4 col-form-label">Assign To: </label>
                    <select name="assignedTo" id="assignedTo" className="form-select col-sm-8">
                        <option value="Heather">Heather</option>
                        <option value="Buttface">Buttface</option>
                        <option value="YourMom">Your Mom</option>
                        <option value="Boo">Boo</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center"><input className="button blue-button" type="submit" value="Create Task" /></div>
            </form>
        </div>
    );
};

export default TaskForm;