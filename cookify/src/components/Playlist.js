import React from 'react';

const Playlist = ({ playlistRef }) => {
  return (
    <div className='playlistContainer'>
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
};

export default Playlist;
