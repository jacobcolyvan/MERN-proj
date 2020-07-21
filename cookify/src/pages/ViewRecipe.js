// View Recipe information and playlist

import React, { useContext, useEffect } from 'react';
import Playlist from '../components/Playlist';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const ViewRecipe = ({ userRecipe }) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h1>View Recipe</h1>
      <p>{userRecipe.name}</p>

      <br />
      <br />
      <Playlist />
    </div>
  );
};

export default ViewRecipe;
