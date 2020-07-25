import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const Playlist = ({ playlistRef }) => {
  const { userData, spotifyAuth, setSpotifyAuth } = useContext(UserContext);

  const getRecommendedTracks = () => {};

  const saveAsPlaylist = () => {
    // Make spotify request to create new playlist
    // Save playlistRef to recipe object
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
  } else {
    return (
      <div className='recommendations-object'>
        <button onClick={saveAsPlaylist}>Save Playlist</button>
      </div>
    );
  }
};

export default Playlist;
