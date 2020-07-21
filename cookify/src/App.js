//Libraries
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Register from './components/auth/Register';
import LoginForm from './components/auth/LoginForm';

//css
import './App.css';

const App = () => {
  // const [userRecipes, setUserRecipes] = useState(null);
  // const [userRecipes, setUserRecipes] = useState([]);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    recipes: undefined
    // spotifyToken: undefined
  });

  async function requestUserData() {
    await Axios.get(
      'http://localhost:3000/users/5f12c2a7d4323119d3e7d0b7'
    ).then((res) => {
      // setUserRecipes(res.data.recipes);
      // console.log(res);
    });
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:3000/auth/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:3000/users/', {
          headers: { 'x-auth-token': token }
        });
        setUserData({
          token,
          user: userRes.data
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className='main'>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <h1>Cookify bru</h1>
          <br />

          {/* {userRecipes && ( */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/add' component={AddRecipe} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={LoginForm} />
            {/* <Route
              exact
              path='/recipes/:id'
              render={(props) => (
                <ViewRecipe
                // userRecipes={userRecipes}
                // userRecipe={userRecipes[props.match.params.id]}
                />
              )}
            /> */}
            <Redirect to='/' />
          </Switch>
          {/* )} */}
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;

{
  /* <p><a href="https://accounts.spotify.com/en/login?continue=https:%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-email%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8888%252Fcallback%26client_id%3D613a9b0f2f88482e861cfaf59533a685" target="_blank">login to Spotify</a></p> */
}

{
  /* // login button (first things first) if backend doesn't respond with successful login status once user object is requested.
              // Is there a refresh token? Did it work successfully? */
}
