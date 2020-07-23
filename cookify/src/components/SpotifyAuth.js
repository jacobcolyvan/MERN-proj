import React from 'react';

const SpotifyAuth = () => {
  return (
    <div>
      <a
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${
          process.env.REACT_APP_SPOTIFY_CLIENT_ID2
        }&scope=user-read-private%20user-read-email&redirect_uri=${encodeURIComponent(
          process.env.REACT_APP_SPOTIFY_CALLBACK_URI
        )}&show_dialog%3Dtrue`}
      >
        Login to SPO
      </a>
      <p>{process.env.REACT_APP_SPOTIFY_CLIENT_ID2} gg</p>
      <p>{process.env.REACT_APP_SPOTIFY_CALLBACK_URI} gg</p>
    </div>
  );
};

export default SpotifyAuth;
