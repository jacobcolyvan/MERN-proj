import React from 'react';

const DetailedRecipeView = ({ recipe }) => {
  console.log(recipe.ingredients);

  console.log(recipe.instructions);
  return (
    <div>
      <h3>{recipe.name}</h3>
      <img src={recipe.image} alt='' />

      <div className='cookingTimes'>
        {recipe.preptime > 0 && <span>Prep Time:{recipe.preptime}</span>}
        {recipe.cookingMinutes > 0 && (
          <span>Cooking Time:{recipe.cookingMinutes}</span>
        )}
        {recipe.totalCookingTime > 0 && (
          <span>Total Cooking Time:{recipe.totalCookingTime}</span>
        )}
      </div>

      <p>{recipe.winePairing.length > 0 && <p>{recipe.winePairings}</p>}</p>
      <p>
        Source:{' '}
        <a href={recipe.recipeUrl} target='_blank' rel='noopener noreferrer'>
          {recipe.sourceName}
        </a>
      </p>
      {recipe.diets.length > 0 && <p>Diet categories: {recipe.diets.map((diet) => (
        <span>{diet}, </span>
      ))}</p>}
      {recipe.cuisines.length > 0 && <p>Cuisines: {recipe.cuisines}</p>}
        <br/>
      <p>
        Ingredients:
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient.original}</li>
        ))}
      </p>
      <br />
      {recipe.instructions.length > 0 && (
        <ol>
          Instructions: <div></div>
          {recipe.instructions[0].steps.map((steps, index) => (
            <li key={`step${index}`}>{steps.step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default DetailedRecipeView;
