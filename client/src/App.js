import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import AllTasks from './views/AllTasks';
import Admin from './views/Admin';
import Login from './components/Login';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CreateTask from './views/CreateTask';
import EditTask from './views/EditTask';
import ViewTask from './views/ViewTask';
import Register from './views/Register';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [toggleUpdate, setToggleUpdate] = useState(false)
  const [users, setUsers] = useState([])

  // Arrays created on the top level to be passed anywhere they are needed, that way it only needs to be changed in one spot.
  const departments = ["Accounting", "Marketing", "Operations", "Sales"]
  const status = ["In Progress", "Completed"]
  const priorities = ["Low", "Medium", "High", "Urgent"]

  // useEffect to set the logged in user, which will be passed anywhere it is needed so this call doesn't need to be made multiple times.
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/loggedInUser', { withCredentials: true })
      .then(res => setLoggedInUser(res.data))
      .catch(err => console.log(err))
  }, [toggleUpdate])


  // Second useEffect to get a list of all users. This list is used in a few places, so it makes sense to have it on the top level instead of making the call on other components.
  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers([...res.data].sort((a, b) => a.firstName > b.firstName ? 1 : -1))
      })
      .catch(err => console.log(err))
  }, [loggedInUser])

return (
  <div className="App pt-3">
    <div>
      <BrowserRouter>
        <Nav toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <div className="card mt-3 p-4">
          <Switch>

            <Route exact path="/">
              <Login toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} />
            </Route>

            <Route exact path="/home">
              {/* Requires a user to be logged in to navigate to any of the below pages. */}
              {loggedInUser._id ? <AllTasks priorities={priorities} status={status} users={users} loggedInUser={loggedInUser} /> : <Link className="text-center" to="/">Please login to continue.</Link>}
            </Route>

            <Route exact path="/tasks/new">
              {loggedInUser._id ? <CreateTask priorities={priorities} status={status} users={users} loggedInUser={loggedInUser} /> : <Link className="text-center" to="/">Please login to continue.</Link>}
            </Route>

            <Route exact path="/tasks/:id/edit">
              {loggedInUser._id ? <EditTask priorities={priorities} status={status} users={users} loggedInUser={loggedInUser} /> : <Link className="text-center" to="/">Please login to continue.</Link>}
            </Route>

            <Route exact path="/tasks/:id">
              {loggedInUser._id ? <ViewTask loggedInUser={loggedInUser} /> : <Link className="text-center" to="/">Please login to continue.</Link>}
            </Route>

            {/* Requires a user to be an admin to navigate to this page. */}
            <Route path="/admin">
              {loggedInUser.admin ? <Admin departments={departments} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} /> : <h4 className="text-center">Must be an admin to access this page.</h4>}
            </Route>

            {/* Route created for deployment to create a user. */}
            <Route path="/secretlyRegister">
              <Register departments={departments} toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/>
            </Route>

          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </div>
);
}

export default App;
