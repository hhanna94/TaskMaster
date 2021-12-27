import React, { useState } from 'react';

const TaskForm = props => {
    const { onSubmitProp, errors, defaultTask, parent, users, status, priorities, loggedInUser } = props
    const [taskInfo, setTaskInfo] = useState(defaultTask)

    // When the user types in the form, update the state.
    const updateForm = e => {
        setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value })
    }

    // When the user submits the form, before using the parent create/edit logic, add the first instance of task history which contains whatever has been typed in the description, the current time, and whoever made the edit (whoever is logged in). Then, use the parent create/edit logic to create or update the task.
    const handleSubmit = e => {
        e.preventDefault()
        let history = taskInfo.history
        let now = new Date()
        let userName = `${loggedInUser.firstName} ${loggedInUser.lastName}`
        history.push({
            description: taskInfo.description,
            time: now,
            editor: userName
        })
        onSubmitProp(taskInfo)
    }

    return (
        <div className="container w-25">
            <form onSubmit={handleSubmit} className="mt-4 container">
                <div className="d-flex justify-content-center mb-3 ">
                    <label htmlFor="taskName" className="col-4 col-form-label">Task Name: </label>
                    <input onChange={updateForm} type="text" className="form-control" id="taskName" name="taskName" value={taskInfo.taskName} />
                </div>
                {errors.taskName ? <p className="text-danger">*{errors.taskName.message}</p> : ""}
                <div className="d-flex justify-content-center mb-3 align-items-center">
                    <label htmlFor="description" className="col-sm-4 col-form-label">Comment: </label>
                    <textarea onChange={updateForm} name="description" id="description" className="form-control" value={taskInfo.description}></textarea>
                </div>
                {errors.description ? <p className="text-danger">*{errors.description.message}</p> : ""}
                <div className="d-flex justify-content-center mb-3">
                    <label htmlFor="dueDate" className="col-sm-4 col-form-label">Due Date: </label>
                    <input onChange={updateForm} type="date" className="form-control" id="dueDate" name="dueDate" value={new Date(taskInfo.dueDate).toLocaleDateString('en-CA', { timeZone: "UTC" })} />
                </div>
                {errors.dueDate ? <p className="text-danger">*{errors.dueDate.message}</p> : ""}
                <div className="d-flex justify-content-center mb-3">
                    <label htmlFor="priority" className="col-sm-4 col-form-label">Priority: </label>
                    <select onChange={updateForm} name="priority" id="priority" className="form-select" value={taskInfo.priority}>
                        <option value="">---</option>
                        {priorities.map((priority, i) => {
                            return (
                                <option key={i} value={priority}>{priority}</option>
                            )
                        })}
                    </select>
                </div>
                {errors.priority ? <p className="text-danger">*{errors.priority.message}</p> : ""}
                <div className="d-flex justify-content-center mb-3">
                    <label htmlFor="assignTo" className="col-sm-4 col-form-label">Assign To: </label>
                    <select onChange={updateForm} name="assignTo" id="assignTo" className="form-select" value={taskInfo.assignTo._id}>
                        <option value="">---</option>
                        {users.map((user, i) => {
                            return (
                                <option key={i} value={user._id}>{user.firstName} {user.lastName}</option>
                            )
                        })}
                    </select>
                </div>
                {errors.assignTo ? <p className="text-danger">*Must choose a user to assign the task to.</p> : ""}
                {/* By default, the status of the task will be In Progress. The user should only see the field to edit the status if the form is in edit mode. */}
                {parent === "edit" ?

                    <div className="d-flex justify-content-center mb-3">
                        <label htmlFor="status" className="col-sm-4 col-form-label">Status: </label>
                        <select onChange={updateForm} name="status" id="status" className="form-select" value={taskInfo.status}>
                            {status.map((status, i) => {
                                return (
                                    <option key={i} value={status}>{status}</option>
                                )
                            })}
                        </select>
                    </div>

                    : ""}
                {/* Change what text displays on the button depending on which mode the form is in. */}
                <div className="d-flex justify-content-center mb-3"><input className="button blue-button" type="submit" value={parent === "edit" ? "Edit Task" : "Create Task"} /></div>
            </form>
        </div>
    );
};

export default TaskForm;