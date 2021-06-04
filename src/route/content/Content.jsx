import { useContext, useEffect } from "react";
import "./Content.scss";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../home/Home";
import Bibliotheque from "../bibliotheque/Bibliotheque";
import TrackShow from "../trackShow/TrackShow";
import Artistshow from "../artistShow/ArtistShow";
import SearchResult from "../searchResult/SearchResult";
import Scrollbar from "smooth-scrollbar";
import NotFound from "../notFound/NotFound";
import PageLoader from "../../components/pageLoader/PageLoader";
import { AppContext } from "../../context/AppContext";

const Content = () => {
  useEffect(() => {
    Scrollbar.init(document.querySelector("#my-scrollbar"), {
      damping: 0.1,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
  }, []);

  const { isLoading } = useContext(AppContext);

  return (
    <div className="content">
      {isLoading && <PageLoader />}
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        atLeave={{ opacity: 0 }}
        className="switch-wrapper">
        <Route exact path="/" component={Home} />
        <Route path="/Biblio" component={Bibliotheque} />
        <Route path="/Track" component={TrackShow} />
        <Route path="/Artist" component={Artistshow} />
        <Route path="/Search" component={SearchResult} />
        <Route component={NotFound} />
      </AnimatedSwitch>
    </div>
  );
};

export default Content;
