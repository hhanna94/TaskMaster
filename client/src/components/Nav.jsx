import axios from 'axios';
import React from 'react';
import {Link, useHistory} from 'react-router-dom'

const Nav = props => {
    const history = useHistory();
    const {toggleUpdate, setToggleUpdate, setLoggedInUser, loggedInUser} = props

    // When a user logs out, toggle an update of the App.js' useEffect since there will no longer be a user logged in, then redirect them to the login page.
    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res => {
                setToggleUpdate(!toggleUpdate)
                setLoggedInUser({})
                history.push("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container d-flex justify-content-between align-items-center">
            <h1 className="align-self-end">TaskMaster</h1>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">All Tasks</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/tasks/new">Create Task</Link>
                </li>
                {/* If the user is an admin, then show the admin link. */}
                {loggedInUser.admin?<li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                </li> : ""}

                {/* If the user is logged in, show a logout button. If they aren't logged in, show a login button. */}
                {loggedInUser._id? <button onClick={logout} className="ms-4 red-button align-self-center">Logout</button>:<Link to="/" className="ms-4 button blue-button align-self-center">Login</Link>}
                
            </ul>
        </div>

    );
};


export default Nav;