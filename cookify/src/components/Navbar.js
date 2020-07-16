import React from 'react'
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
