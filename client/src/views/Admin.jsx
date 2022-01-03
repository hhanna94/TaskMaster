import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ZA from "../assets/Z-A.svg"
import AZ from "../assets/A-Z.svg"

const Admin = props => {
    const { departments, toggleUpdate, setToggleUpdate } = props
    const defaultUserInfo = { firstName: "", lastName: "", department: "", email: " ", password: "", confirmPassword: "", admin: false }
    const [userFormInfo, setUserFormInfo] = useState(defaultUserInfo)
    const [toggleReload, setToggleReload] = useState(false)
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [mode, setMode] = useState("create")
    const [sort, setSort] = useState(true)

    // Logic to allow the user to sort employees by department.
    const sortList = () => {
        let departmentImg = document.getElementById("departmentImg")
        if (sort) {
            departmentImg.src = AZ
            return [...users].sort( (a,b) => a.department > b.department ? 1 : -1)
        } else {
            departmentImg.src = ZA
            return [...users].sort( (a,b) => a.department < b.department ? 1 : -1)
        }
    }

    // Updates the user form state when a user makes changes to the form.
    const updateUserForm = (e) => {
        let value
        // Checks whether the input type is a checkbox. If it is, it needs to be set to be the boolean opposite of what it was. All other inputs are handled the same.
        if (e.target.type === "checkbox") {
            value = !userFormInfo.admin;
        } else {
            value = e.target.value;
        }
        setUserFormInfo({...userFormInfo, [e.target.name]: value})
    }

    // Gets a list of user emails if the mode is create. This is used to add a front-end validation for if the email has already been used.
    const getUserEmails = () => {
        if (mode === "create") {
            let emails = {}
            users.forEach(function (user) {
                emails[user.email] = 1
            })
            return emails
        }
    }
    let userEmails = getUserEmails();

    // Switches the forms mode to edit mode if the user clicks edit in the table, with default form information of the user they want to edit.
    const switchToEditMode = user => {
        setMode("edit")
        setUserFormInfo(user)
        setErrors({})
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // If the user is in create mode, call on the API to create a user. If it passes the back-end validations, but returns that the user already exists, set the error to be displayed. If it passes all other back-end validations, reset everything so the form is clear and the users table gets updated.
        if (mode === "create") {
            axios.post('http://localhost:8000/api/users', userFormInfo)
                .then(res => {
                    console.log(res)
                    if (res.data.userExists) {
                        setErrors(res.data)
                    } else {
                        setErrors({})
                        setUserFormInfo(defaultUserInfo)
                        setToggleReload(!toggleReload)
                    }
                })
                // If the API call does not pass back-end validations, set the error state so that the user knows what they did wrong.
                .catch(err => {
                    setErrors(err.response.data.errors)
                })
        }
        // If the user is in edit mode, call on the API to edit the user. If it passes all back-end validations, reset everything so the form is back to create mode and is clear, and the users table gets updated.
        else {
            axios.put(`http://localhost:8000/api/users/${userFormInfo._id}`, userFormInfo)
                .then(res => {
                    setErrors({})
                    setUserFormInfo(defaultUserInfo)
                    setToggleReload(!toggleReload)
                    setMode("create")
                })
                // If the API call does not pass back-end validations, set the error state so that the user knows what they did wrong.
                .catch(err => {
                    setErrors(err.response.data.errors)
                })
        }
        // Reload App, not just Admin page since there has been a change to users that needs to be reflected in other parts of the app.
        setToggleUpdate(!toggleUpdate)
    }

    // Delete the user when an admin clicks the delete button.
    const deleteUser = id => {
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => setToggleReload(!toggleReload))
            .catch(err => console.log(err))
    }

    // Upon loading the page (and forcing the trigger through updating toggleReload), get a list of all users.
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [toggleReload])

    return (
        <div className="container">
            <h3 className="mb-2">Admin</h3>
            <div className="d-flex justify-content-around">
                <div>
                    <h4 className="text-center">Users</h4>
                    <table style={{ minWidth: "30vw" }} className="mt-4 table table-striped table-bordered border-dark text-center align-middle">
                        <thead>
                            <tr>
                                <td className="col-4">Name</td>
                                <td className="col-4">Department <img id="departmentImg" className="ms-2" onClick={e => { setSort(!sort) }} style={{ width: "1em", height: "1em" }} src={AZ} /></td>
                                <td className="col-4" colSpan="2">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loaded && sortList().map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.department}</td>
                                        <td><button onClick={() => { switchToEditMode(user) }} className="button blue-button">Edit</button></td>
                                        <td><button className="button red-button" onClick={() => { deleteUser(user._id) }}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "22vw" }}>
                    {mode === "create" ? <h4 className="text-center">Create a User</h4> : <h4 className="text-center">Edit User</h4>}
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="formDiv">
                            <label htmlFor="firstName" className="col-5 col-form-label">First Name: </label>
                            <input onChange={updateUserForm} type="text" className="form-control" id="firstName" name="firstName" value={userFormInfo.firstName} />
                        </div>
                        {errors.firstName ? <p className="text-danger">*{errors.firstName.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="lastName" className="col-5 col-form-label">Last Name: </label>
                            <input onChange={updateUserForm} type="text" className="form-control" id="lastName" name="lastName" value={userFormInfo.lastName} />
                        </div>
                        {errors.lastName ? <p className="text-danger">*{errors.lastName.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="department" className="col-5 col-form-label">Department: </label>
                            <select onChange={updateUserForm} name="department" className="form-select" value={userFormInfo.department}>
                                <option value="">---</option>
                                {departments.map((department, i) => {
                                    return (
                                        <option key={i} value={department}>{department}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {errors.department ? <p className="text-danger">*{errors.department.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="email" className="col-5 col-form-label">Email: </label>
                            <input onChange={updateUserForm} type="email" name="email" id="email" className="form-control" value={userFormInfo.email} />
                        </div>
                        {errors.email ? <p className="text-danger">*{errors.email.message} </p> : ""}
                        {mode === "create" && userEmails[userFormInfo.email] ? <p className="text-danger">*Email is already in use. </p> : ""}
                        {errors.userExists ? <p className="text-danger">*{errors.userExists} </p> : ""}
                        {mode === "create" ? <div className="formDiv">
                            <label htmlFor="password" className="col-5 col-form-label">Password: </label>
                            <input onChange={updateUserForm} type="password" name="password" id="password" className="form-control" value={userFormInfo.password} />
                        </div> : ""}
                        {errors.password ? <p className="text-danger">*{errors.password.message} </p> : ""}
                        {mode === "create" ? <div className="formDiv">
                            <label htmlFor="confirmPassword" className="col-5 col-form-label">Confirm Password: </label>
                            <input onChange={updateUserForm} type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={userFormInfo.confirmPassword} />
                        </div> : ""}
                        {/* Front end validation to make sure the password and confirm password fields match. */}
                        {mode === "create" && userFormInfo.password !== userFormInfo.confirmPassword && userFormInfo.confirmPassword.length > 0 ? <p className="text-danger">*Passwords must match.</p> : ""}
                        <div className="formDiv justify-content-between">
                            <div>
                                <label htmlFor="admin" className="col-form-label me-2">Admin?</label>
                                <input onChange={updateUserForm} type="checkbox" name="admin" id="admin" checked={userFormInfo.admin} />
                            </div>
                            {mode === "create" ? <input className="button blue-button" type="submit" value="Create User" /> : <input className="button blue-button" type="submit" value="Edit User" />}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Admin;