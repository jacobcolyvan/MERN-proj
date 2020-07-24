// Update login details.
import React, {useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import UserContext from '../context/UserContext'

const Dashboard = () => {

    const history = useHistory()

    const { userData, setUserData } = useContext(UserContext);
    console.log(userData.token);
    console.log(userData.user);
    const editUsername = async () => {
        // await axios.put(`http://localhost:3000/user${userData.user}`, {} )
    }

    const deleteAccount = async () => {
       await axios.delete(`http://localhost:3000/user/${userData.user}`,
       {    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userData.token
      }})
      history.push('/login')
    }


    return (
        <div>
            <button onClick={editUsername}>Edit Username</button>

            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}

export default Dashboard
