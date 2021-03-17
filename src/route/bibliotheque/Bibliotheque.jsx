import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Bibliotheque.scss";
import Loader from "react-loader-spinner";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";

const Bibliotheque = React.memo(() => {
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
            <div
              className="bibliotheque__tracks"
              style={{ marginBottom: props.showSearch ? "4rem" : "3rem" }}>
              <div className="section-header">
                <BibliothequeItem
                  name="Name"
                  artistName="Artist"
                  minute="Duration"
                  preview="Play"
                  artistId="0"
                  queu="0"
                />
              </div>
              {props.tracks &&
                props.tracks.map((track) => {
                  return (
                    <BibliothequeItem
                      key={
                        track.id + Math.random(1000) ||
                        track.track.id + Math.random(1000)
                      }
                      onClick={props.setTrackShow}
                      id={track.id || track.track.id}
                      name={track.name || track.track.name}
                      artistName={
                        track.track
                          ? track.track.artists[0].name
                          : track.album
                          ? track.album.artists[0].name
                          : track.artists
                          ? track.artists[0].name
                          : null
                      }
                      minute={props.millisToMinutesAndSeconds(
                        track.duration_ms || track.track.duration_ms
                      )}
                      href={
                        track.track
                          ? track.track.preview_url
                          : track.preview_url
                      }
                      onClickArtist={props.setArtistShow}
                      artistId={
                        track.track
                          ? track.track.artists[0].id
                          : track.album
                          ? track.album.artists[0].id
                          : track.artists
                          ? track.artists[0].id
                          : null
                      }
                      setTrackToPlay={props.setTrackToPlay}
                      uri={track.track ? track.track.uri : track.uri}
                      addToQueu={props.addToQueu}
                    />
                  );
                })}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

export default React.memo(Bibliotheque);
