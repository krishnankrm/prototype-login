import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";

import './App.css';

export default class  App extends Component {
  render() {
    return(
    <Router>  
      <Routes>
          <Route path="/Login" element={<Login />}         />
          <Route path="/Signup" element={<Signup />}         />
          <Route path="/" element={<Login />}         />
        </Routes>
      </Router>
       )
  }
}