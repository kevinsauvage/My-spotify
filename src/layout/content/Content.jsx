import { useEffect } from "react";
import "./Content.scss";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../../route/home/Home";
import Bibliotheque from "../../route/bibliotheque/Bibliotheque";
import TrackShow from "../../route/trackShow/TrackShow";
import Artistshow from "../../route/artistShow/ArtistShow";
import SearchResult from "../../route/searchResult/SearchResult";
import Scrollbar from "smooth-scrollbar";
import NotFound from "../../route/notFound/NotFound";

const Content = () => {
  useEffect(() => {
    Scrollbar.init(document.querySelector("#my-scrollbar"), {
      damping: 0.1,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
  }, []);
  return (
    <div className="content">
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
