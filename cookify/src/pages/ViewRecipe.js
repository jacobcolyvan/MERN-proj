// View Recipe information and playlist

import React from 'react'
import Playlist from '../components/Playlist'

const ViewRecipe = ({userRecipe}) => {
    return (
        <div>
            <h1>View Recipe</h1>
            <p>{userRecipe.name}</p>

            <br />
            <br />
            <Playlist />
        </div>
    )
}

export default ViewRecipe
