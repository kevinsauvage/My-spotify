import React from "react";
import { Scopes, SpotifyAuth } from "react-spotify-auth";
import HeaderLogin from "../headerLogin/HeaderLogin";
import "./Login.scss";

const Login = () => {
  return (
    <div className="auth">
      <HeaderLogin />
      <SpotifyAuth
        redirectUri={process.env.REACT_APP_REDIRECT_URL}
        clientID={process.env.REACT_APP_CLIENT_ID}
        scopes={[Scopes.all]}
      />
      <h3>( Only for spotify premium users )</h3>
    </div>
  );
};

export default Login;
