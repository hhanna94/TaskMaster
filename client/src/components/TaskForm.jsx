import React, { useState } from 'react';

const TaskForm = props => {
    const { onSubmitProp, errors, defaultTask, parent, users, status, priorities, loggedInUser } = props
    const [success, setSuccess] = useState(false)
    const [taskInfo, setTaskInfo] = useState(defaultTask)

    const updateForm = e => {
        setTaskInfo({ ...taskInfo, [e.target.name]: e.target.value })
        setSuccess(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        let timeNow = new Date().toLocaleTimeString()
        if (parent === "edit") {
            let userName = `${loggedInUser.firstName} ${loggedInUser.lastName}`
            taskInfo.history.push({
                description: taskInfo.description, 
                time: taskInfo.updatedAt, 
                editor: userName})
        }
        console.log(taskInfo)
        onSubmitProp(taskInfo)
        setSuccess(true)
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
                    <label htmlFor="description" className="col-sm-4 col-form-label">Description: </label>
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
                {success ? <p className="text-success text-center">**Task saved successfully.**</p> : ""}
                <div className="d-flex justify-content-center mb-3"><input className="button blue-button" type="submit" value={parent === "edit" ? "Edit Task" : "Create Task"} /></div>
            </form>
        </div>
    );
};

export default TaskForm;