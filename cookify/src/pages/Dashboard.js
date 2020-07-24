// Update login details.
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';

import UserContext from '../context/UserContext';

const Dashboard = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    newUsername: '',
    password:'',
    newPassword: '',
    newPassword2: ''
  });

  const { userData, setUserData } = useContext(UserContext);
  const {newUsername, password, newPassword, newPassword2} = formData
  const [error, setError] = useState();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  console.log(userData.token);
  console.log(userData.user);
  const editUsername = async () => {
    // await axios.put(`http://localhost:3000/user${userData.user}`, {} )
  };


  const onSubmit = async (e) => {
      e.preventDefault();
      if(newPassword !== newPassword2) {
          setError('new passwords do not match')
      }else {
          try {
              await axios.put(`http://lolcahost:3000/users/${userData.user}`, formData)
          } catch (error) {
              
          }
      }
  }
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
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <label>Edit Username</label>
        <input
          type='text'
          placeholder=''
          name='username'
          required
          value={newUsername}
          onChange={(e) => onChange(e)}
        />
        <label>Edit Password</label>
      </form>

      <form>
        <input
          type='password'
          placeholder=''
          required
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
        <input
          type='password'
          placeholder='New Password'
          required
          name='password2'
          value={newPassword}
          onChange={(e) => onChange(e)}
          minLength='6'
        />

        <input
          type='password'
          placeholder='Confirm New Password'
          required
          name='password2'
          value={newPassword2}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
      </form>
      <input type='submit' value='Register' />
      <button onClick={editUsername}>Edit Username</button>

      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
};

export default Dashboard;
