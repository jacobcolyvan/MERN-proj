//Libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Register from './components/auth/Register';
import LoginForm from './components/auth/LoginForm';
// import Alert from './components/Alert';

const App = () => {
  const [userRecipes, setUserRecipes] = useState(null);

  async function requestUserData() {
    await axios
      .get('http://localhost:3000/users/5f1533ac7a07e0be45e808cd')
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
      <Provider store={store}>
        <Router>
          <Navbar />
          <h1>Cookify bru</h1>
          <br />
          {/* <Alert /> */}
          {userRecipes && (
            <Switch>
              <Route exact path='/'>
                <Home userRecipes={userRecipes} onUpdate={requestUserData} />
              </Route>
              <Route exact path='/add'>
                <AddRecipe
                  userRecipes={userRecipes}
                  onUpdate={requestUserData}
                />
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
      </Provider>
    </div>
  );
};

export default App;
