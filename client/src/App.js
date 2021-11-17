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

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [toggleUpdate, setToggleUpdate] = useState(false)
  const [users, setUsers] = useState([])
  const departments = ["Accounting", "Marketing", "Operations", "Sales"]
  const status = ["In Progress", "Completed"]
  const priorities = ["Low", "Medium", "High", "Urgent"]

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/loggedInUser', { withCredentials: true })
      .then(res => {
        setLoggedInUser(res.data)
      })
      .catch(err => console.log(err))
  }, [toggleUpdate])

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

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
                {loggedInUser._id ? <AllTasks priorities={priorities} status={status} users={users} loggedInUser={loggedInUser}/> : <Link className="text-center" to="/">Please login to continue.</Link>}
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

              <Route path="/admin">
                {loggedInUser.admin ? <Admin departments={departments} /> : <h4 className="text-center">Must be an admin to access this page.</h4>}
              </Route>

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
