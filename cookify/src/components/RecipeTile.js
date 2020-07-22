import React from 'react';
import './RecipeTile.css';

const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div>
      {/* <Link to="/View" */}
      {recipes.map((recipe, index) => (
        <div className='recipe'>
          <h3 key={recipe.index}>{recipe.title} </h3>
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
