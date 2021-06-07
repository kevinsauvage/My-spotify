import { useContext } from "react";
import "./Content.scss";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../home/Home";
import Bibliotheque from "../bibliotheque/Bibliotheque";
import TrackShow from "../trackShow/TrackShow";
import Artistshow from "../artistShow/ArtistShow";
import SearchResult from "../searchResult/SearchResult";
import NotFound from "../notFound/NotFound";
import PageLoader from "../../components/pageLoader/PageLoader";
import { AppContext } from "../../context/AppContext";
import AlbumShow from "../albumShow/AlbumShow";

const Content = () => {
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
        <Route path="/track/:id" component={TrackShow} />
        <Route path="/artist/:id" component={Artistshow} />
        <Route path="/album/:id" component={AlbumShow} />
        <Route path="/Search" component={SearchResult} />
        <Route component={NotFound} />
      </AnimatedSwitch>
    </div>
  );
};

export default Content;
