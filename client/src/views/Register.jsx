import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

// This component is a duplicate of the registration form on the Admin component, however I was struggling to get the user set up in MongoDB with the hashed password reading correctly on the AWS server, and was unable to login which forced the need for this as a temporary measure on the deployed site.
const Register = props => {
    const history = useHistory();
    const { departments} = props
    const defaultUserInfo = { firstName: "", lastName: "", department: "", email: " ", password: "", confirmPassword: "", admin: false }
    const [userFormInfo, setUserFormInfo] = useState(defaultUserInfo)
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)


    // Updates the user form state when a user makes changes to the form.
    const updateUserForm = (e) => {
        let value
        // Checks whether the input type is a checkbox. If it is, it needs to be set to be the boolean opposite of what it was. All other inputs are handled the same.
        if (e.target.type === "checkbox") {
            value = !userFormInfo.admin;
        } else {
            value = e.target.value;
        }
        setUserFormInfo({ ...userFormInfo, [e.target.name]: value })
    }

    // Gets a list of user emails. This is used to add a front-end validation for if the email has already been used.
    const getUserEmails = () => {
        let emails = {}
        users.forEach(function (user) {
            emails[user.email] = 1
        })
        return emails
    }
    let userEmails = getUserEmails();



    const handleSubmit = (e) => {
        e.preventDefault();
        // Call on the API to create a user. If it passes the back-end validations, but returns that the user already exists, set the error to be displayed. If it passes all other back-end validations, reset everything so the form is clear and the users table gets updated.
        axios.post('http://localhost:8000/api/users', userFormInfo)
            .then(res => {
                console.log(res)
                if (res.data.userExists) {
                    setErrors(res.data)
                } else {
                    history.push("/")
                    // setErrors({})
                    // setUserFormInfo(defaultUserInfo)
                    // setToggleReload(!toggleReload)
                }
            })
            // If the API call does not pass back-end validations, set the error state so that the user knows what they did wrong.
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    // Upon loading the page (and forcing the trigger through updating toggleReload), get a list of all users.
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container w-25">
            {loaded && <div>
                <h4 className="text-center">Register a User</h4>
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
                    {userEmails[userFormInfo.email] ? <p className="text-danger">*Email is already in use. </p> : ""}
                    {errors.userExists ? <p className="text-danger">*{errors.userExists} </p> : ""}
                    <div className="formDiv">
                        <label htmlFor="password" className="col-5 col-form-label">Password: </label>
                        <input onChange={updateUserForm} type="password" name="password" id="password" className="form-control" value={userFormInfo.password} />
                    </div>
                    {errors.password ? <p className="text-danger">*{errors.password.message} </p> : ""}
                    <div className="formDiv">
                        <label htmlFor="confirmPassword" className="col-5 col-form-label">Confirm Password: </label>
                        <input onChange={updateUserForm} type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={userFormInfo.confirmPassword} />
                    </div>
                    {/* Front end validation to make sure the password and confirm password fields match. */}
                    {userFormInfo.password !== userFormInfo.confirmPassword && userFormInfo.confirmPassword.length > 0 ? <p className="text-danger">*Passwords must match.</p> : ""}
                    <div className="formDiv justify-content-between">
                        <div>
                            <label htmlFor="admin" className="col-form-label me-2">Admin?</label>
                            <input onChange={updateUserForm} type="checkbox" name="admin" id="admin" checked={userFormInfo.admin} />
                        </div>
                        <input className="button blue-button" type="submit" value="Register User" />
                    </div>
                </form>
            </div>}
        </div>
    );
};


export default Register;