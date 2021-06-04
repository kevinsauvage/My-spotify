import "./app.scss";
import "react-spotify-auth/dist/index.css";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import Main from "../layout/main/Main";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import Cookies from "js-cookie";
import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import HeaderLogin from "../components/headerLogin/HeaderLogin";

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
          <HeaderLogin />
          <SpotifyAuth
            redirectUri={process.env.REACT_APP_REDIRECT_URL}
            clientID={process.env.REACT_APP_CLIENT_ID}
            scopes={[Scopes.all]}
          />
          <h3>( Only for spotify premium users )</h3>
        </div>
      )}
    </div>
  );
};

export default App;
