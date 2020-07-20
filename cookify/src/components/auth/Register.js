import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //need to export connect
import { setAlert } from '../../actions/alert'; // bring action in
import PropTypes from 'prop-types';

//connect allows us to connect our components to redux

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const { username, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger'); // refer to actions/alerts, for what this will do
    } else {
      console.log('success');
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
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
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />

        <input
          type='password'
          placeholder='Confirm passwword'
          required
          name='password2'
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
//connect takes in a state and an object with actions you want to use, we can access the actions through props
//name of component goes after connect
