import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navBar'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/add'>New</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </div>
  );
};

export default Navbar;
