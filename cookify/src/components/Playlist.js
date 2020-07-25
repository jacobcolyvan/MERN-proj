import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Playlist = ({ recipe, playlistRef }) => {
  const { userData, setUserData, spotifyAuth } = useContext(UserContext);

  const getRecommendedTracks = () => {};

  const saveAsPlaylist = async () => {
    try {
      // Make spotify request to create new playlist
      const spotifyRes = await axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
          Authorization: 'Bearer ' + spotifyAuth
        },
        data: {
          name: `${recipe.name}`,
          description: `A playlist generated for the ${recipe.name} recipe`,
          public: true
        }
      });

      // Save playlistRef to recipe object
      const newPlaylistData = {
        id: userData.user,
        recipeId: recipe.id,
        newPlaylistRef: spotifyRes.data.id
      };

      const newRecipes = await axios.put(
        `http://localhost:3000/users/recipes/add-playlist`,
        newPlaylistData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token
          }
        }
      );

      console.log('playlistRef has been added to recipe');
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: newRecipes.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (playlistRef) {
    return (
      <div className='playlist-container'>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistRef}`}
          width='300'
          height='380'
          allowtransparency='true'
          allow='encrypted-media'
          className='playlist'
          title='Playlist Object'
        ></iframe>
      </div>
    );
  } else if (spotifyAuth) {
    return (
      <div className='recommendations-object'>
        <button onClick={saveAsPlaylist}>Save Playlist</button>
      </div>
    );
  }
};

export default Playlist;
