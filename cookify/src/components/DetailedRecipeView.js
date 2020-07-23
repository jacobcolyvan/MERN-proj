import React from 'react';

const DetailedRecipeView = ({recipe}) => {
  return (
    <div>
    <h3>{recipe.name}</h3>
    <img src={recipe.image} alt='' />

    <div className="cookingTimes">
     {(recipe.preptime != 0) && <span>Prep Time:{recipe.preptime}</span>}
      <span>Cooking Time:{recipe.cookingMinutes}</span>
      <span>Total Cooking Time:{recipe.totalCookingTime}</span>
    </div>

    <p>{recipe.winePairing.length > 0 && <p>{recipe.winePairings}</p>}</p>
    <p>Source: <a href={recipe.recipeUrl} target="_blank">{recipe.sourceName}</a></p>
    <p>Diet categories: {recipe.diets}</p>
    <p>Cuisines: {recipe.cuisines}</p>

    <p>Ingredients:  {recipe.ingredients.map((ingredient) => (
      <li>{ingredient.original}</li>
    ))}</p> 

    {/* <p>Instructions: {recipe.instructions.map((steps)=> (
        <li>{steps.[0].step}</li>
    ))}
    </p> */}
    {/* {JSON.stringify(recipe.instructions)} */}
    </div>
  )
};

export default DetailedRecipeView;
