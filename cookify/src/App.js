import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Register from './components/auth/Register';
import LoginForm from './components/auth/LoginForm';

const App = () => {
  const [userRecipes, setUserRecipes] = useState(null);

  async function requestUserData() {
    await axios
      .get('http://localhost:3000/user/5f12c2a7d4323119d3e7d0b7')
      .then((res) => {
        setUserRecipes(res.data.recipes);
        // console.log(res);
      });
  }

  useEffect(() => {
    requestUserData();
    console.log('gg');
  }, []);

  return (
    <div className='main'>
      <Router>
        <Navbar />
        <h1>Cookify bru</h1>
        <br />

        {userRecipes && (
          <Switch>
            <Route exact path='/'>
              <Home userRecipes={userRecipes} onUpdate={requestUserData} />
            </Route>
            <Route exact path='/add'>
              <AddRecipe userRecipes={userRecipes} onUpdate={requestUserData} />
            </Route>

            <Route exact path='/register' component={Register} />

            <Route exact path='/login' component={LoginForm} />
            <Route
              exact
              path='/recipes/:id'
              render={(props) => (
                <ViewRecipe
                  // userRecipes={userRecipes}
                  userRecipe={userRecipes[props.match.params.id]}
                />
              )}
            />
            <Redirect to='/' />
          </Switch>
        )}
      </Router>
    </div>
  );
};

export default App;
