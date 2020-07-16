// search bar, which searches through your recipes
// recipeslist

import React, { useState, useEffect } from 'react'
import SearchController from '../components/SearchController'
import axios from 'axios'

const Home = () => {
    const [userRecipes, setUserRecipes] = useState([])

    function requestUserData() {
        axios
        .get('http://localhost:3000/user/5f0d8f6f9420353e3e8da972')
        .then(res => {
            setUserRecipes(res.data.recipes)
            console.log(res.data.recipes);
        })
    }

    useEffect (() => {
        requestUserData()
    }, [])

    return (
        <div>
            View saved recipes/home
            <SearchController />
            {userRecipes.map( (recipe) => (
                <>
                    <br/>
                    <li>{recipe.name}</li>
                    <li>{recipe.playlistRef}</li>
                </>
            ))}
        </div>
    )
}

export default Home
