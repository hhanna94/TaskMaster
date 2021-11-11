import React from 'react';
import {Link} from 'react-router-dom'

const Admin = () => {
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
                            <tr>
                                <td>Heather Hanna</td>
                                <td>Operations</td>
                                <td><Link className="button red-button" to="/users/id/delete">Delete</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h4 className="text-center">Create a User</h4>
                    <form className="mt-4">
                        <div className="d-flex justify-content-center mb-3">
                            <label for="firstName" className="col-sm-4 col-form-label">First Name: </label>
                            <input type="password" className="form-control col-sm-8" id="firstName" name="firstName" />
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <label for="lastName" className="col-sm-4 col-form-label">Last Name: </label>
                            <input type="password" className="form-control col-sm-8" id="lastName" name="lastName" />
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <label for="department" className="col-sm-4 col-form-label">Department: </label>
                            <select name="department" id="department" className="form-select col-sm-8">
                                <option value="">Low</option>
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
            </div>
        </div>
    );
};


export default Admin;