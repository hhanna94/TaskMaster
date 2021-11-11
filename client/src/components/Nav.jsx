import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div className="container d-flex justify-content-between align-items-center">
            <h1 className="align-self-end">TaskMaster</h1>
            <ul class="nav">
                <li class="nav-item">
                    <Link class="nav-link" to="/home">My Open Tasks</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/tasks">All Tasks</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/tasks/new">Create Task</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/admin">Admin</Link>
                </li>
                <button className="ms-4 red-button align-self-center">Logout</button>
            </ul>
        </div>

    );
};


export default Nav;