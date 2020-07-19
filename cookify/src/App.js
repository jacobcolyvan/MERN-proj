import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddRecipe from './pages/AddRecipe'
import ViewRecipe from './pages/ViewRecipe'


const App = () => {
  const [userRecipes, setUserRecipes] = useState(null)

  async function requestUserData() {
      await axios
      .get('http://localhost:3000/user/5f0d8f6f9420353e3e8da972')
      .then(res => {
          setUserRecipes(res.data.recipes)
          // console.log(res);
      })
    }

    useEffect (() => {
        requestUserData()
        console.log("gg");
    }, [])


  return (
    <div className="main">  
      
      <Router>
        <Navbar />
        <h1>Cookify bru</h1>  
        <p><a href="https://accounts.spotify.com/en/login?continue=https:%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-email%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8888%252Fcallback%26client_id%3D613a9b0f2f88482e861cfaf59533a685" target="_blank">login to Spotify</a></p>

        {/* // login button (first things first) if backend doesn't respond with successful login status once user object is requested.
            // Is there a refresh token? Did it work successfully? */}
        <br/>

        {userRecipes && (
          <Switch>
          <Route exact path ='/'>
            <Home 
              userRecipes={userRecipes}
              onUpdate={requestUserData}
            /> 
          </Route>
          <Route exact path='/add'>
            <AddRecipe 
              userRecipes={userRecipes}
              onUpdate={requestUserData}
            />
          </Route>
          <Route exact path='/recipes/:id'
              render={props => 
                <ViewRecipe
                  // userRecipes={userRecipes}
                  userRecipe={userRecipes[props.match.params.id]}
                />
              }
          />
          <Redirect to='/' />
          </Switch>
        )}
        
          
          
          
      </Router>
    </div>
  )
}

export default App