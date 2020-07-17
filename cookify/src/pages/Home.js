// search bar, which searches through your recipes
// recipeslist
// Search controller on this page should search through presaved recipes

import React, { useState, useEffect } from 'react'
import SearchController from '../components/SearchController'
import axios from 'axios'
import UserRecipeTile from '../components/UserRecipeTile'

const Home = (userRecipes) => {
    console.log(userRecipes)

    return (
        <div>
            <p>View saved recipes/home</p>
            <br/>
            <UserRecipeTile userRecipes={userRecipes}/>
            {/* <SearchController /> */}

        </div>
    )
}

export default Home
