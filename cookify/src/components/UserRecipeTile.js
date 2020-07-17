import React from 'react'
import { Link } from "react-router-dom";

const UserRecipeTile = ({userRecipes}) => {
    return (
        <div className = 'userRecipeTile'>
            {if (userRecipes) {
                userRecipes.map( (recipe, index) => (
                <div key={`${recipe}-${index}`}>
                    {/* <br/> */}
                    {/* <h3><Link to = '/add'>{recipe.name}</Link></h3> */}
                    <br/>
                    <p>Playlist: {recipe.playlistRef}</p>
                </div>
            ))}}
        </div>
    )
}

export default UserRecipeTile
