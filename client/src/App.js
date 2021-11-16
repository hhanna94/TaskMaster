import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import MyTasks from './components/MyTasks';
import AllTasks from './components/AllTasks';
import TaskForm from './components/TaskForm';
import Admin from './components/Admin';
import Login from './components/Login';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [toggleUpdate, setToggleUpdate] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/loggedInUser', { withCredentials: true })
      .then(res => {
        console.log("running")
        setLoggedInUser(res.data)
      })
      .catch(err => console.log(err))
  }, [toggleUpdate])

  return (
    <div className="App pt-3">
      <div>
        <BrowserRouter>
          <Nav toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
          <div className="card mt-3 p-4">
            <Switch>
              <Route exact path="/">
                <Login toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate}/>
              </Route>
              <Route path="/home">
                { loggedInUser._id? <MyTasks /> : <Link className="text-center" to="/">Please login to continue.</Link> }
              </Route>
              <Route exact path="/tasks">
                { loggedInUser._id? <AllTasks /> : <Link className="text-center" to="/">Please login to continue.</Link> }
              </Route>
              <Route path="/tasks/new">
                { loggedInUser._id? <TaskForm /> : <Link className="text-center" to="/">Please login to continue.</Link> }
              </Route>
              <Route path="/admin">
                {loggedInUser.admin? <Admin /> : <h4 className="text-center">Must be an admin to access this page.</h4> }
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
