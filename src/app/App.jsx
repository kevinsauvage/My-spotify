import "./app.scss";
import "react-spotify-auth/dist/index.css";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../layout/main/Main";
import Login from "../components/login/Login";
import { AppProvider } from "../context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const token = window.location.hash.split("=")[1];

  return (
    <div className="App">
      {token ? (
        <AppProvider>
          <Router>
            <Sidebar />
            <Main />
          </Router>
        </AppProvider>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
