import React from 'react'

const UserRecipeTile = ({userRecipes}) => {
    return (
        <div className = 'userRecipeTile'>
            {userRecipes.map( (recipe, index) => (
                <div key={`${recipe}-${index}`}>
                    <br/>
                    <h3>{recipe.name}</h3>
                    <br/>
                    <p>Playlist: {recipe.playlistRef}</p>
                </div>
            ))}
        </div>
    )
}

export default UserRecipeTile
