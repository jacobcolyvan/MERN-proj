import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import AddRecipe from './pages/AddRecipe'

const App = () => {
  return (
    <div>  
      <Router>
        <Navbar />
        <Switch>
          <Route exact path ='/'>
            <Home /> 
          </Route>
          <Route exact path='/add'>
            <AddRecipe />
          </Route>
          
          <Redirect to='/' />
        </Switch>
      </Router>

      <h1>Cookify bru</h1>
    </div>
  )
}

export default App