import "./assets/stylesheets/app.scss";
import "./assets/stylesheets/pages/Auth.scss";
import "react-spotify-auth/dist/index.css";
import React from "react";
import SidebarLeft from "./components/SidebarLeft";
import Main from "./components/Main";
import SidebarRight from "./components/SidebarRight";
import Cookies from "js-cookie";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";

const App = () => {
  let token = Cookies.get("spotifyAuthToken");
  return (
    <div className="App">
      {token ? (
        <AppProvider>
          <SpotifyApiContext.Provider value={token}>
            <Router>
              <SidebarLeft />
              <Main />
              <SidebarRight />
            </Router>
          </SpotifyApiContext.Provider>
        </AppProvider>
      ) : (
        <div className="auth">
          <SpotifyAuth
            redirectUri={process.env.REACT_APP_REDIRECT_URL}
            clientID={process.env.REACT_APP_CLIENT_ID}
            scopes={[Scopes.all]}
          />
        </div>
      )}
    </div>
  );
};

export default App;
