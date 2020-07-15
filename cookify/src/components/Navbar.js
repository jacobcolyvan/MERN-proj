import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import AddRecipe from '../pages/AddRecipe'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navBar">
          <li><Link to='/' >Home</Link></li>
          <li><Link to='/add' >New</Link></li>
          <br/>
        </div>
    )
}

export default Navbar
