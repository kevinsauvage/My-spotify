import "./app.scss";
import "react-spotify-auth/dist/index.css";
import SidebarLeft from "../components/sidebarLeft/SidebarLeft";
import Main from "../layout/main/Main";
import SidebarRight from "../components/sidebarRight/SidebarRight";
import PageLoader from "../components/pageLoader/PageLoader";
import Login from "../components/login/Login";
import Cookies from "js-cookie";
import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  let token = Cookies.get("spotifyAuthToken");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {isLoading && <PageLoader />}
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
