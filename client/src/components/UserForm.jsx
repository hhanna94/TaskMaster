import React, {useState} from 'react';

const UserForm = props => {
    const departments = ["Accounting", "Marketing", "Operations", "Sales"]

    const {onSubmitProp, errors, defaultUserInfo} = props
    const [userFormInfo, setUserFormInfo] = useState(defaultUserInfo)

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


    return (
        <div>
            <form onSubmit={e => {onSubmitProp(userFormInfo)}} className="mt-4">
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
    );
};

export default UserForm;