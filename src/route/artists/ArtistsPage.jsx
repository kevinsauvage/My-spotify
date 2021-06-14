import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../../context/AppContext";
import "./ArtistsPage.scss";
import Tracks from "../../components/tracks/Tracks";
import ArtistsRelated from "./artistsRelated/ArtistsRelated";
import WentWrong from "../../components/wentWrong/WentWrong";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import Albums from "../../components/albums/Albums";

const CarouselArtists = React.lazy(() =>
  import("./carouselArtists/CarouselArtists")
); // Lazy-loaded

const ArtistsPage = () => {
  const [artistTopTracks, setArtistTopTracks] = useState([]); // array of artist top tracks
  const [recomendedTracks, setRecomendedTracks] = useState([]);
  const [id, setId] = useState();
  const [artistSelected, setArtistSelected] = useState();
  const [carouselFav, setCarouselFav] = useState(true);
  const [carouselFoll, setCarouselFoll] = useState(false);
  const [showRecomended, setShowRecomended] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(true);
  const [error, setError] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [showArtistAlbums, setShowArtistAlbums] = useState(false);
  const [savedArtists, setSavedArtists] = useState([]);
  const {
    spotifyApi,
    followedArtists,
    topArtists,
    checkIfAlbumsAreFollowed,
    savedAlbums,
  } = useContext(AppContext);

  useEffect(() => {
    topArtists && !id && setId(topArtists?.[2]?.artist?.id);
  }, [topArtists, id]);

  useEffect(() => {
    const savedArtists = followedArtists.map((artist) => {
      return { artist: artist, follow: true };
    });
    setSavedArtists(savedArtists);
  }, [followedArtists]);

  useEffect(() => {
    const setArtistShow = async () => {
      try {
        const artist = await spotifyApi.getArtist(id);
        setArtistSelected(artist);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }; // Set artist to show on artist show page
    id && setArtistShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getRecommendationsTracks = async () => {
      try {
        const tracks = await spotifyApi.getRecommendations({
          seed_artists: id,
          limit: 10,
        });
        setRecomendedTracks(tracks);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    id && getRecommendationsTracks();
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
        console.log(error);
      }
    };
    id && getArtistTopTracks();
  }, [id, spotifyApi]);

  const fetchArtistAlbums = useCallback(async () => {
    const artistAlbums = await spotifyApi.getArtistAlbums(id);
    const unique = artistAlbums.items.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.place === thing.place && t.name === thing.name)
    );
    const sorted = unique.sort((a, b) => a.release_date > b.release_date);
    const albumWithFollow = await checkIfAlbumsAreFollowed(sorted);
    setArtistAlbums(albumWithFollow);
  }, [savedAlbums, checkIfAlbumsAreFollowed, id, spotifyApi]);

  useEffect(() => {
    id && fetchArtistAlbums();
  }, [id, fetchArtistAlbums]);

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
    setShowArtistAlbums(false);
  };
  const toggleRecommendedTracks = () => {
    setShowTopTracks(false);
    setShowRecomended(true);
    setShowArtistAlbums(false);
  };

  const toggleArtistAlbums = () => {
    setShowTopTracks(false);
    setShowRecomended(false);
    setShowArtistAlbums(true);
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
                title={"Recommended Artists"}
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
                  artists={savedArtists}
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
                  condition={showArtistAlbums}
                  fn={toggleArtistAlbums}
                  title={`${artistSelected?.name} Albums`}
                />
                <ClickableTitle
                  condition={showRecomended}
                  fn={toggleRecommendedTracks}
                  title={`${artistSelected?.name} Recommended Tracks`}
                />
              </div>
              <div className="artistsPage__tracks">
                {showRecomended && <Tracks data={recomendedTracks?.tracks} />}
                {showTopTracks && <Tracks data={artistTopTracks?.tracks} />}
                {showArtistAlbums && <Albums data={artistAlbums} />}
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
