import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Bibliotheque.scss";
import Loader from "react-loader-spinner";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";

const Bibliotheque = () => {
  const props = useContext(AppContext);
  return (
    <div className="bibliotheque">
      <AnimatePresence>
        {props.isLoading ? (
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
                <h1 className="bibliotheque__name">{props.nameB}</h1>
                {props.description && (
                  <h2 className="bibliotheque__playlist-detail">
                    {props.description}
                  </h2>
                )}
                {props.followers && (
                  <p className="bibliotheque__followers">{props.followers}</p>
                )}
                {props.playlistToPlay && (
                  <PlayBtn onClick={props.setPlaylistUri} />
                )}
              </div>
            </div>
            <div className="bibliotheque__tracks">
              <div className="section-header">
                <BibliothequeItemHeader name artist duration play queu />
              </div>
              {props.tracks &&
                props.tracks.map((track) => {
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
                      duration={props.millisToMinutesAndSeconds(
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
                      addToQueu={props.addToQueu}
                      uri={track.track ? track.track.uri : track.uri}
                      setTrackToPlay={props.setTrackToPlay}
                      onClickArtist={props.setArtistShow}
                      id={track.id || track.track.id}
                      onClick={props.setTrackShow}
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
