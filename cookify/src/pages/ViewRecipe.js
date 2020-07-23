// View Recipe information and playlist

import React, { useContext, useEffect } from 'react';
import Playlist from '../components/Playlist';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import DetailedRecipeView from '../components/DetailedRecipeView';

const ViewRecipe = ({ recipe }) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h1>View Recipe</h1>
      {recipe && <DetailedRecipeView recipe={recipe} />}

      <br />
      <br />
      <Playlist />
    </div>
  );
};

export default ViewRecipe;
