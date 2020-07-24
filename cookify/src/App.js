//Libraries
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UserContext from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Register from './components/auth/Register';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard'
// import UserRecipeTile from './components/UserRecipeTile';

//css
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    recipes: undefined,
    // spotifyToken: undefined
  });

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
      console.log('token res coming');
      console.log(tokenRes);
      if (tokenRes.data.isUser) {
        console.log('yep');
        // const userRes = await Axios.get('http://localhost:3000/users/', {
        //   headers: { 'x-auth-token': token }
        // });
        setUserData({
          token: tokenRes.data.token,
          user: tokenRes.data._id,
          recipes: tokenRes.data.recipes
        });
        // history.push
      }
    };
    checkLoggedIn();
  }, []);

  const getUserData = async () => {};

  return (
    <div className='main'>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <h1 className='home-header'>Cookify bru</h1>
          <br />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/add' component={AddRecipe} />
            <Route
              exact
              path='/recipes/:id'
              render={(props) => (
                <ViewRecipe
                  recipe={
                    userData.recipes && userData.recipes[props.match.params.id]
                  }
                />
              )}
            />
            <Route exact path='/account' component={Dashboard}/>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={LoginForm} />
       
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
