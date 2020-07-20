import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const { username, password, password2 } = formData;
  const [userToken, setUserToken] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords do not match');
    } else {
      console.log('success');
      //send username and password to backend?

      await axios
        .post('http://localhost:3000/auth/register', formData, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
          console.log(res);
          setUserToken(res.data.token);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
          console.log('there was an error');
        });
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <p>{userToken}</p>
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

        <input
          type='password'
          placeholder='Confirm passwword'
          required
          name='password2'
          required
          value={password2}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
        <input type='submit' value='Register' />
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
