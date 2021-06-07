import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";

const CategoryShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const { spotifyApi, scrollbar, setUri } = useContext(AppContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getRecomended = async () => {
      scrollTop(scrollbar);
      const recommendations = await spotifyApi.getRecommendations({
        seed_genres: id,
        limit: 50,
      });
      setTracks(recommendations.tracks);
    };
    getRecomended();
  }, [scrollbar, setTracks, spotifyApi, id]);

  const handleClickPlay = () => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  };

  return (
    <div className="bibliotheque">
      <div className="bibliotheque__banner">
        <div className="bibliotheque__description">
          <h1 className="bibliotheque__name">{id}</h1>
          <PlayBtn onClick={handleClickPlay} />
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default CategoryShow;
