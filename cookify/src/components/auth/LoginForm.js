import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    "username": '',
    "password": '',
  });

  const { username, password } = formData;
  const [userToken, setUserToken] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('http://localhost:3000/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        console.log(res);
        console.log('success');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='Username'
          name='username'
          required
          value={username}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='Password'
          required
          name='password'
          required
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />

        <input type='submit' value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
