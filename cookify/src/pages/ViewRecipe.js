// Shows DetailedRecipeView and Playlist
// Rendered in App.js

import React, { useContext, useEffect } from 'react';
import Playlist from '../components/Playlist';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import DetailedRecipeView from '../components/DetailedRecipeView';

const ViewRecipe = ({ recipe }) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();


  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      {recipe && <DetailedRecipeView recipe={recipe} />}

      <br />
      <br />
      <Playlist />
    </div>
  );
};

export default ViewRecipe;
