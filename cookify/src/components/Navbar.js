import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from './auth/AuthOptions';

const Navbar = () => {
  return (
    <div className='navBar'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/add'>New</Link>
      </li>
      {/* <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li> */}

      <AuthOptions></AuthOptions>
    </div>
  );
};

export default Navbar;
