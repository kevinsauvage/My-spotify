import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import "./Bibliotheque.scss";
import Loader from "react-loader-spinner";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";
import Tracks from "../../components/tracks/Tracks";

const Bibliotheque = () => {
  const {
    isLoading,
    description,
    nameB,
    followers,
    playlistToPlay,
    setPlaylistUri,
    tracks,
  } = useContext(AppContext);

  useEffect(() => {
    console.log("biblio");
  }, []);

  return (
    <div className="bibliotheque">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="loader"
            key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}>
            <Loader
              type="ThreeDots"
              color="#FFF"
              height={40}
              width={40}
              timeout={2000}
            />
          </motion.div>
        ) : (
          <>
            <div className="bibliotheque__banner">
              <div className="bibliotheque__description">
                <h1 className="bibliotheque__name">{nameB}</h1>
                {description && (
                  <h2 className="bibliotheque__playlist-detail">
                    {description}
                  </h2>
                )}
                {followers && (
                  <p className="bibliotheque__followers">{followers}</p>
                )}
                {playlistToPlay && <PlayBtn onClick={setPlaylistUri} />}
              </div>
            </div>
            <Tracks data={tracks} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bibliotheque;
