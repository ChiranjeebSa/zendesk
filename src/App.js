import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
 
  Switch,
  Route,
} from "react-router-dom";
import Signin from './Signin';
 import Home from './Home';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route  exact path='/'>
          <Signin />
          </Route>
          <Route path="/users">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}
// function Home() {
//   alert('sdsdsdsd')
//   return <div>Home</div>;
// }
export default App;
