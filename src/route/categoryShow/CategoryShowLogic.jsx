import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const CategoryShowLogic = (id) => {
  const { spotifyApi, setUri } = useContext(AppContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getRecomended = async () => {
      const recommendations = await spotifyApi.getRecommendations({
        seed_genres: id,
        limit: 100,
      });
      setTracks(recommendations.tracks);
    };
    getRecomended();
  }, [setTracks, spotifyApi, id]);

  const handleClickPlay = () => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  };

  return { handleClickPlay, tracks };
};

export default CategoryShowLogic;
