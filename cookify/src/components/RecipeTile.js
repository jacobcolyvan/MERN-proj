import React from 'react';
import './RecipeTile.css';
import { Link } from 'react-router-dom';

// this is to render individual recipe block/tiles

const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div>
      {/* <Link to="/View" */}
      {recipes.map((recipe, index) => (
        <div className='recipe'>
          <h3 key={recipe.index}>
            <Link to>{recipe.title} </Link>
          </h3>
          <img className='image' src={recipe.image} alt='' />
          <p>
            {recipe.diets.map((diet, index) => (
              <li key={diet.index}>{diet}</li>
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
