import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import "./Bibliotheque.scss";
import Loader from "react-loader-spinner";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";

const Bibliotheque = () => {
  const {
    isLoading,
    description,
    nameB,
    followers,
    playlistToPlay,
    setPlaylistUri,
    tracks,
    millisToMinutesAndSeconds,
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
            <div className="bibliotheque__tracks">
              <div className="section-header">
                <BibliothequeItemHeader name artist duration play queu />
              </div>
              {tracks &&
                tracks.map((track) => {
                  return (
                    <BibliothequeItem
                      key={
                        track.id + Math.random(1000) ||
                        track.track.id + Math.random(1000)
                      }
                      name={track.name || track.track.name}
                      artist={
                        track.track
                          ? track.track.artists[0].name
                          : track.album
                          ? track.album.artists[0].name
                          : track.artists
                          ? track.artists[0].name
                          : null
                      }
                      duration={millisToMinutesAndSeconds(
                        track.duration_ms || track.track.duration_ms
                      )}
                      artistId={
                        track.track
                          ? track.track.artists[0].id
                          : track.album
                          ? track.album.artists[0].id
                          : track.artists
                          ? track.artists[0].id
                          : null
                      }
                      uri={track.track ? track.track.uri : track.uri}
                      id={track.id || track.track.id}
                      play
                    />
                  );
                })}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bibliotheque;
