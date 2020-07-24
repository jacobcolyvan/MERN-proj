// Update login details.
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

//styling
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const Dashboard = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  //   const [formData, setFormData] = useState({
  //     password: '',
  //     newPassword: '',
  //     newPassword2: '',
  //   });
  //   const { password, newPassword, newPassword2 } = formData;
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [error, setError] = useState();
  const [newUsername, setNewUsername] = useState('');
  const [passwords, setPasswords] = useState({
    password: '',
    newPassword: '',
    newPassword2: '',
  });

  const { password, newPassword, newPassword2 } = passwords;

  //   useEffect(async () => {
  //     await axios.get('');
  //   });

  const usernameHandler = (e) => {
    setNewUsername(e.target.value);
    // console.log(newUsername);
  };

  const passwordHandler = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  //   console.log(userData);
  //   console.log(userData.token);
  //   console.log(userData.user);

  //logic to send a newUsername
  const onSubmitUsername = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/user/${userData.user}`,
        { newUsername },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    history.push('/');
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setError('new passwords do not match');
    } else {
    }
  };

  const deleteAccount = async () => {
    await axios.delete(`http://localhost:3000/user/${userData.user}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userData.token,
      },
    });
    history.push('/login');
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmitUsername(e)} className='form'>
        <label>Edit Username</label>
        <input
          type='text'
          placeholder=''
          name='newUsername'
          required
          value={newUsername}
          onChange={(e) => usernameHandler(e)}
        />
        <input type='submit' value='Edit' />
        {/* <button onClick={editUsername}>Edit</button> */}
      </form>

      {/* <form>
        <input
          type='password'
          placeholder=''
          required
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        /> */}
      {/* <input
          type='password'
          placeholder='New Password'
          required
          name='password2'
          value={newPassword}
          onChange={(e) => onChange(e)}
          minLength='6'
        /> */}

      {/* <input
          type='password'
          placeholder='Confirm New Password'
          required
          name='password2'
          value={newPassword2}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
      </form>
      <input type='submit' value='Submit' /> */}

      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
};

export default Dashboard;
