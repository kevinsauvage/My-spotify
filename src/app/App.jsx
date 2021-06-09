import "./app.scss";
import "react-spotify-auth/dist/index.css";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import Main from "../layout/main/Main";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import Login from "../components/login/Login";
import Cookies from "js-cookie";
import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const token =
    window.location.hash.split("=")[1] || Cookies.get("spotifyAuthToken");
  return (
    <div className="App">
      {token ? (
        <AppProvider>
          <Router>
            <SidebarLeft />
            <Main />
            <SidebarRight />
          </Router>
        </AppProvider>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
