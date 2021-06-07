import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";

const CategoryShowLogic = (id) => {
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

  return { handleClickPlay, tracks };
};

export default CategoryShowLogic;
