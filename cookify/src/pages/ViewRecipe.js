// View Recipe information and playlist

import React, { useContext, useEffect } from 'react';
import Playlist from '../components/Playlist';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const ViewRecipe = ({ recipe }) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h1>View Recipe</h1>
      {recipe && <p>{recipe.name}</p>}

      <br />
      <br />
      <Playlist />
    </div>
  );
};

export default ViewRecipe;
