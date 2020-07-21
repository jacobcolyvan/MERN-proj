// search bar, which searches through your recipes
// recipeslist
// Search controller on this page should search through presaved recipes

import React, { useEffect, useContext } from 'react';
import UserRecipeTile from '../components/UserRecipeTile';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  // console.log(userData);

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <p>View saved recipes/home</p>
      <br />
      {userData.recipes && <UserRecipeTile userRecipes={userData.recipes} />}
    </div>
  );
};

export default Home;
