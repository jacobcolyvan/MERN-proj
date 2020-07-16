// search bar, which searches through your recipes
// recipeslist
// Search controller on this page should search through presaved recipes

import React, { useState, useEffect } from 'react'
import SearchController from '../components/SearchController'
import axios from 'axios'
import UserRecipeTile from '../components/UserRecipeTile'

const Home = () => {
    const [userRecipes, setUserRecipes] = useState([])

    function requestUserData() {
        axios
        .get('http://localhost:3000/user/5f0d8f6f9420353e3e8da972')
        .then(res => {
            setUserRecipes(res.data.recipes)
            // console.log(res);
        })
    }

    useEffect (() => {
        requestUserData()
    }, [])

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
