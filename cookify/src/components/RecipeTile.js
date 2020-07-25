import React from 'react';
import './RecipeTile.css';
import { Link } from 'react-router-dom';

//renders list of searched recipes

const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div>
      {recipes.map((recipe, index) => (
        <div className='recipe'>
          <h3 key={recipe.index}>
            <Link to='/recipe/view'>{recipe.title} </Link>
          </h3>

          <div>
            <img className='image' src={recipe.image} alt='' />
          </div>
          <p>
            {recipe.diets.map((diet, index) => (
              <li key={`diet${index}`}>{diet}</li>
            ))}
          </p>
          <button
            onClick={() => {
              saveRecipe(index);
            }}
          >
            Favourite/Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeTile;
