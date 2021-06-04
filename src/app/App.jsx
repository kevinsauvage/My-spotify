import "./app.scss";
import "react-spotify-auth/dist/index.css";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import Main from "../layout/main/Main";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import Cookies from "js-cookie";
import { AppContext, AppProvider } from "../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { SpotifyApiContext } from "react-spotify-api";
import PageLoader from "../components/pageLoader/PageLoader";
import { useContext } from "react";
import Login from "../components/login/Login";

const App = () => {
  let token = Cookies.get("spotifyAuthToken");
  const props = useContext(AppContext);

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
      ) : props?.isLoading ? (
        <PageLoader />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
