import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Playlist = ({ recipe, playlistRef }) => {
  const { userData, setUserData, spotifyAuth } = useContext(UserContext);
  const [recommendedTracks, setRecommendedTracks] = useState(undefined);

  const getRecommendedTracks = async () => {
    try {
      const trackRecs = await axios({
        method: 'get',
        url:
          'https://api.spotify.com/v1/recommendations?market=AU&seed_genres=iranian&target_instrumentalness=0.4',
        headers: {
          Authorization: 'Bearer ' + spotifyAuth,
          'Content-Type': 'application/json'
        }
      });

      const trackIds = trackRecs.data.tracks.map(
        (track) => `spotify:track:${track.id}`
      );
      console.log(trackIds);
      setRecommendedTracks(trackIds);
    } catch (err) {
      console.log(err);
      console.log('There was an error getting recommended tracks');
    }
  };

  const addTracksToPlaylist = async (playlistId) => {
    await axios({
      method: 'post',
      url: `  https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
        recommendedTracks.join(',')
      )}`,
      headers: {
        Authorization: 'Bearer ' + spotifyAuth,
        'Content-Type': 'application/json'
      }
    });
  };

  const saveAsPlaylist = async () => {
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
    const playlistRef = spotifyRes.data.id;
    const newPlaylistData = {
      id: userData.user,
      recipeId: recipe.id,
      newPlaylistRef: playlistRef
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
    // await setUserData({
    //   token: userData.token,
    //   user: userData.user,
    //   recipes: newRecipes.data
    // });
    return [playlistRef, newRecipes.data];
  };

  const saveTracksToPlaylist = async () => {
    try {
      const data = await saveAsPlaylist();
      // console.log(pl);
      await addTracksToPlaylist(data[0]);
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: data[1]
      });
      console.log('Playlist made and tracks saved');
    } catch (err) {
      console.log(err.message);
      console.log('there was an error saving the playlist');
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
        {recommendedTracks ? (
          <button onClick={saveTracksToPlaylist}>Save As Playlist</button>
        ) : (
          <button onClick={getRecommendedTracks}>Get Recommended Tracks</button>
        )}
      </div>
    );
  }
};

export default Playlist;
