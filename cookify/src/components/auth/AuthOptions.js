import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <div className='auth-options'>
      {userData ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
