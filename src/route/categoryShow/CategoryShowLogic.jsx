import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const CategoryShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const { spotifyApi, setUri } = useContext(AppContext);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getRecomended = async () => {
      try {
        const recommendations = await spotifyApi.getRecommendations({
          seed_genres: id,
          limit: 100,
        });
        setTracks(recommendations.tracks);
      } catch (error) {
        setError(true);
      }
    };
    getRecomended();
  }, [setTracks, spotifyApi, id]);

  const handleClickPlay = () => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  };

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return { handleClickPlay, tracks, error, bg, id };
};

export default CategoryShowLogic;
