import "./App.css";
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Userprofile from "./components/Userprofile";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Trendingrepo from "./components/Trendingrepo";

function App() {
  var [loggedin,setLoggedin]=useState(false);
  var setstatus=(status)=>{
    if(status){
      setLoggedin(true);
    }
    if(!status){
      setLoggedin(false);
    }
  }
  return (
    <>
      <Router>
          {loggedin?<Redirect to="/profile"/>:<Redirect to="/"/>}
        
        
        
        <Switch>
          <Route exact path='/'>
            <div className='main-section'>
              <Navbar loggedin={loggedin}/>
              <Login setstatus={setstatus}/>
            </div>
          </Route>
          <Route exact path="/signup">
          <div className='main-section'>
              <Navbar loggedin={loggedin} />
              <Signup />
            </div>
          </Route>
          <Route exact path="/profile">
            <Navbar loggedin={loggedin} setstatus={setstatus}/>
            <Profile />
          </Route>

          <Route exact path="/user/:username">
            <Navbar loggedin={loggedin} setstatus={setstatus}/>
            <Userprofile />
          </Route>

          <Route exact path="/trendingrepo">
            <Navbar loggedin={loggedin} setstatus={setstatus}/>
            <Trendingrepo />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
