import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchResultLogic = () => {
  const location = useLocation();
  const { items } = location.state;

  const { setUri } = useContext(AppContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (location.state.items.tracks.total === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [location]);

  const handlePlay = () => {
    const uris = items.tracks.items.map((item) => item.uri);
    setUri(uris);
  };
  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return { bg, handlePlay, error, items };
};

export default SearchResultLogic;
