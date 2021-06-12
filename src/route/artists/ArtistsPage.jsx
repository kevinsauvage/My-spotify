import React, { Suspense, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./ArtistsPage.scss";
import Tracks from "../../components/tracks/Tracks";
import ArtistsRelated from "./artistsRelated/ArtistsRelated";
import WentWrong from "../../components/wentWrong/WentWrong";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
const CarouselArtists = React.lazy(() =>
  import("./carouselArtists/CarouselArtists")
); // Lazy-loaded

const ArtistsPage = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState(undefined); // array of artist top tracks
  const [id, setId] = useState();
  const [artistSelected, setArtistSelected] = useState();
  const [carouselFav, setCarouselFav] = useState(true);
  const [carouselFoll, setCarouselFoll] = useState(false);
  const [recomendedTrack, setRecomendedTrack] = useState();
  const [showRecomended, setShowRecomended] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(true);
  const [error, setError] = useState(false);

  const { spotifyApi, setFollowedArtists, followedArtists } =
    useContext(AppContext);

  useEffect(() => {
    const getTopArtist = async () => {
      try {
        const topArtist = await spotifyApi.getMyTopArtists();
        setTopArtists(topArtist.items);
        setId(topArtist.items[1].id || topArtist.items[0].id);
      } catch (error) {
        setError(true);
      }
    };
    getTopArtist();
  }, [setTopArtists, spotifyApi]);

  useEffect(() => {
    const setArtistShow = async () => {
      try {
        const artist = await spotifyApi.getArtist(id);
        setArtistSelected(artist);
      } catch (error) {
        setError(true);
      }
    }; // Set artist to show on artist show page
    id && setArtistShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getRecommendationsTrack = async () => {
      try {
        const tracks = await spotifyApi.getRecommendations({
          seed_artists: id,
          limit: 10,
        });
        setRecomendedTrack(tracks);
      } catch (error) {
        setError(true);
      }
    };
    id && getRecommendationsTrack();
  }, [spotifyApi, id]);

  useEffect(() => {
    const getArtistTopTracks = async () => {
      try {
        const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", {
          limit: 20,
        });
        setArtistTopTracks({ tracks: topTracks.tracks, id: id });
      } catch (error) {
        setError(true);
      }
    };
    id && getArtistTopTracks();
  }, [id, spotifyApi]);

  useEffect(() => {
    const settingFollowedArtists = async () => {
      try {
        const response = await spotifyApi.getFollowedArtists({ limit: 50 });
        setFollowedArtists(response.artists.items);
      } catch (error) {
        setError(true);
      }
    }; // Fetch followed artist from user
    id && settingFollowedArtists();
  }, [spotifyApi, setFollowedArtists, id]);

  const toggleCarouselFavorite = () => {
    setCarouselFav(true);
    setCarouselFoll(false);
  };

  const toggleCarouselFollowers = () => {
    setCarouselFav(false);
    setCarouselFoll(true);
  };

  const toggleTopTracks = () => {
    setShowTopTracks(true);
    setShowRecomended(false);
  };
  const toggleRecommendedTracks = () => {
    setShowTopTracks(false);
    setShowRecomended(true);
  };

  return (
    <div className="artistsPage">
      {!error ? (
        <>
          <div className="artistsPage__carousel">
            <div className="artistsPage__menu">
              <ClickableTitle
                condition={carouselFav}
                fn={toggleCarouselFavorite}
                title={"Favorite Artists"}
              />
              <ClickableTitle
                condition={carouselFoll}
                fn={toggleCarouselFollowers}
                title={"Followed Artists"}
              />
            </div>
            {carouselFav && (
              <Suspense fallback={<CardLoader />}>
                <CarouselArtists
                  artists={topArtists}
                  artistSelected={artistSelected}
                  setId={setId}
                />
              </Suspense>
            )}
            {carouselFoll && (
              <Suspense fallback={<CardLoader />}>
                <CarouselArtists
                  artists={followedArtists}
                  artistSelected={artistSelected}
                  setId={setId}
                />
              </Suspense>
            )}
          </div>

          <section className="artistsPage__content">
            <div className="artistsPage__tracksContainer">
              <div className="artistsPage__menu">
                <ClickableTitle
                  condition={showTopTracks}
                  fn={toggleTopTracks}
                  title={`${artistSelected?.name} Top Tracks`}
                />
                <ClickableTitle
                  condition={showRecomended}
                  fn={toggleRecommendedTracks}
                  title={`${artistSelected?.name} Recommended Tracks`}
                />
              </div>
              <div className="artistsPage__tracks">
                {showRecomended && <Tracks data={recomendedTrack?.tracks} />}
                {showTopTracks && <Tracks data={artistTopTracks?.tracks} />}
              </div>
            </div>
            <div className="artistsPage__relatedArtists">
              <ArtistsRelated
                id={id}
                setError={setError}
                artistSelected={artistSelected}
              />
            </div>
          </section>
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default ArtistsPage;
