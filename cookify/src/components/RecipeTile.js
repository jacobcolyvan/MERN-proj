import React from 'react';
import './RecipeTile.css';

const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div className='recipe'>
      {/* <Link to="/View" */}
      {recipes.map((recipe, index) => (
        <div>
          <h3 key={recipe.index}>{recipe.title} </h3>
          <img
            className='image'
            src={`https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg`}
            alt=''
          />
          <br></br>
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
