import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './components/Home'
import { Users } from './components/Users'
import { Projects } from './components/Projects'
import { Navigation } from './components/Navigation'



function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className = "m-3 d-flex justify-content-center">
          React ile Web Application Yaratma
        </h3>
        <Navigation />
      <Switch>
        <Route path = '/' component = {Home} exact ></Route>
        <Route path = '/users' component = {Users} exact ></Route>
        <Route path = '/projects' component = {Projects} exact ></Route>
      </Switch>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
