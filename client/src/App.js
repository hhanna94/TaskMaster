import './App.css';
import Nav from './components/Nav';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MyTasks from './components/MyTasks';
import AllTasks from './components/AllTasks';
import TaskForm from './components/TaskForm';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App pt-3">
      <div>
        <BrowserRouter>
          <Nav />
          <div className="card mt-3 p-4">
            <Switch>
              <Route path="/home">
                <MyTasks />
              </Route>
              <Route exact path="/tasks">
                <AllTasks />
              </Route>
              <Route path="/tasks/new">
                <TaskForm />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
