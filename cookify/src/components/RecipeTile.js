import React from 'react'
import './RecipeTile.css'
import {Link} from 'react-router-dom'
import ViewRecipe from '../pages/ViewRecipe'

const RecipeTile = ({title, image}) => {
  return (
    <div className='recipe'>
      <h3><ViewRecipe />{title}</h3>
      {/* <Link to="/View" */}
      <img src={image} alt=""/>
    </div>
  )
}


export default RecipeTile
