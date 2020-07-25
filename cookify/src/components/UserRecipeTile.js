import React from 'react';
import { Link } from 'react-router-dom';

//this is for saved user recipes - rendered on home page

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
          <img className='image' src={recipe.image} alt='' />
          <br />
          <p>Cooking time: {recipe.totalCookingTime}</p>
          {recipe.cuisines.length > 0 && <p>{recipe.cuisines}</p>}
        </div>
      ))}
    </div>
  );
};

export default UserRecipeTile;
