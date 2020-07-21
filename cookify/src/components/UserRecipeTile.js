import React from 'react';
import { Link } from 'react-router-dom';

const UserRecipeTile = ({ userRecipes }) => {
  console.log(userRecipes);
  return (
    <div className='userRecipeTile'>
      {userRecipes.map((recipe, index) => (
        <div key={`${recipe}-${index}`}>
          {/* <br/> */}
          <h3>
            <Link to={`/recipes/${index}`}>{recipe.name}</Link>
          </h3>
          <br />
          <p>Playlist: {recipe.playlistRef}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRecipeTile;
