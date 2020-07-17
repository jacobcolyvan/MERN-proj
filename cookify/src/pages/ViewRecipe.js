// View Recipe information and playlist

import React from 'react'
import Playlist from '../components/Playlist'

const ViewRecipe = (userRecipe) => {
    console.log(userRecipe);
    // const recipeName = userRecipe.name
    // const playlistReg = userRecipe.playlistRef

    return (
        <div>
            <h1>View Recipe</h1>
            <p>{}</p>

            <br />
            <br />
            {/* <Playlist /> */}
        </div>
    )
}

export default ViewRecipe
