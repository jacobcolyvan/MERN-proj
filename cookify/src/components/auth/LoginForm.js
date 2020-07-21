import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { setUserData } = useContext(UserContext);

  const { username, password } = formData;
  const [userToken, setUserToken] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axios.post(
        'http://localhost:3000/auth/login',
        formData
      );
      console.log(loginRes);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      console.log(loginRes.data.token);
      localStorage.setItem('auth-token', loginRes.data.token);
    } catch (err) {
      console.log(err);
    }
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
