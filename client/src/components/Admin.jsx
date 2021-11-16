import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Admin = () => {
    const departments = ["Accounting", "Marketing", "Operations", "Sales"]
    const defaultUserInfo = {firstName: "", lastName: "", department: "", email: "", password: "", confirmPassword: "", admin: false}
    const [userFormInfo, setUserFormInfo] = useState(defaultUserInfo)
    const [toggleReload, setToggleReload] = useState(false)
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)

    const updateUserForm = (e) => {
        let value
        if (e.target.type === "checkbox") {
            value = !userFormInfo.admin;
        } else {
            value = e.target.value;
        }
        setUserFormInfo({
            ...userFormInfo,
            [e.target.name]: value
        })
    }

    const createUser = (e) => {
        e.preventDefault();
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
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    const deleteUser = id => {
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log(res)
                setToggleReload(!toggleReload)
            })
            .catch(err => console.log(err))
    }

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
                    <table style={{minWidth:"30vw"}} className="mt-4 table table-striped table-bordered border-dark text-center align-middle">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Department</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {loaded && users.map( (user, i) => {
                                return (
                                <tr key={i}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.department}</td>
                                    <td><button className="button red-button" onClick={ () => {deleteUser(user._id)}}>Delete</button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{width: "22vw"}}>
                    <h4 className="text-center">Create a User</h4>
                    <form onSubmit={createUser} className="mt-4">
                        <div className="formDiv">
                            <label htmlFor="firstName" className="col-5 col-form-label">First Name: </label>
                            <input onChange={updateUserForm} type="text" className="form-control" id="firstName" name="firstName"  value={userFormInfo.firstName}/>
                        </div>
                        {errors.firstName ? <p className="text-danger">*{errors.firstName.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="lastName" className="col-5 col-form-label">Last Name: </label>
                            <input onChange={updateUserForm} type="text" className="form-control" id="lastName" name="lastName"  value={userFormInfo.lastName}/>
                        </div>
                        {errors.lastName ? <p className="text-danger">*{errors.lastName.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="department" className="col-5 col-form-label">Department: </label>
                            <select onChange={updateUserForm} name="department" id="department" className="form-select" value={userFormInfo.department}>
                                <option value="">---</option>
                                {departments.map( (department, i) => { 
                                    return (
                                        <option key={i} value={department}>{department}</option>
                                )})}
                            </select>
                        </div>
                        {errors.department ? <p className="text-danger">*{errors.department.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="email" className="col-5 col-form-label">Email: </label>
                            <input onChange={updateUserForm} type="email" name="email" id="email" className="form-control" value={userFormInfo.email} />
                        </div>
                        {errors.email ? <p className="text-danger">*{errors.email.message} </p> : ""}
                        {errors.userExists ? <p className="text-danger">*{errors.userExists} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="password" className="col-5 col-form-label">Password: </label>
                            <input onChange={updateUserForm} type="password" name="password" id="password" className="form-control" value={userFormInfo.password} />
                        </div>
                        {errors.password ? <p className="text-danger">*{errors.password.message} </p> : ""}
                        <div className="formDiv">
                            <label htmlFor="confirmPassword" className="col-5 col-form-label">Confirm Password: </label>
                            <input onChange={updateUserForm} type="password" name="confirmPassword" id="confirmPassword" className="form-control"  value={userFormInfo.confirmPassword}/>
                        </div>
                        {userFormInfo.password !== userFormInfo.confirmPassword && userFormInfo.confirmPassword.length>0 ? <p className="text-danger">*Passwords must match.</p> : ""}
                        <div className="formDiv justify-content-between">
                            <div>
                                <label htmlFor="admin" className="col-form-label me-2">Admin?</label>
                                <input onChange={updateUserForm} type="checkbox" name="admin" id="admin" checked={userFormInfo.admin} />
                            </div>
                            <input className="button blue-button" type="submit" value="Create User" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default Admin;