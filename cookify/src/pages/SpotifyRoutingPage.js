import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const SpotifyRoutingPage = (props) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const backendAuthCode = async (data) => {
      await axios.post(`http://localhost:3000/spotify/callback`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userData.token
        }
      });
    };

    if (props.location.search.split('=')[1] && userData.token) {
      // console.log(userData);
      let data = {
        code: props.location.search.split('=')[1],
        id: userData.user
      };
      backendAuthCode(data).then((data) => {
        // console.log('gg');
        history.push('/');
      }).catch = (err) => {
        console.log(err);
        console.log('there was an error with the token routing');
        // failed
        history.push('/');
      };
    } else if (!props.location.search.split('=')[1]) {
      history.push('/');
    }
  }, [userData, history, props.location.search]);

  return (
    <div>
      <p>Redirecting you back home... </p>
    </div>
  );
};

export default SpotifyRoutingPage;
