import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  lazy,
} from "react";
import { AppContext } from "../../context/AppContext";
import "./ArtistsPage.scss";
import Tracks from "../../components/tracks/Tracks";
import ArtistsRelated from "../../components/artistsRelated/ArtistsRelated";
import WentWrong from "../../components/wentWrong/WentWrong";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import Albums from "../../components/albums/Albums";

const CarouselComponent = lazy(() =>
  import("../../components/carousel/CarouselComponent")
); // Lazy-loaded

const ArtistsPage = () => {
  const [artistTopTracks, setArtistTopTracks] = useState([]); // array of artist top tracks
  const [id, setId] = useState();
  const [artistSelected, setArtistSelected] = useState();
  const [carouselFav, setCarouselFav] = useState(true);
  const [carouselFoll, setCarouselFoll] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(true);
  const [error, setError] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [showArtistAlbums, setShowArtistAlbums] = useState(false);
  const {
    spotifyApi,
    followedArtists,
    topArtists,
    checkIfAlbumsAreFollowed,
    savedAlbums,
    checkIfTrackIsSaved,
    savedTracks,
    followArtist,
    unfollowArtist,
  } = useContext(AppContext);

  useEffect(() => {
    topArtists && !id && setId(topArtists?.[2]?.item?.id);
  }, [topArtists, id]);

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
    const getArtistTopTracks = async () => {
      try {
        const topTracks = await spotifyApi.getArtistTopTracks(id, "FR", {
          limit: 20,
        });
        const tracksWithFollow = await checkIfTrackIsSaved(topTracks.tracks);
        setArtistTopTracks(tracksWithFollow);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    id && getArtistTopTracks();
  }, [id, spotifyApi, checkIfTrackIsSaved, savedTracks]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAlbums, checkIfAlbumsAreFollowed, id, spotifyApi]); // saved album can't be removed as it update album of artist page when user save/unsave album

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
    setShowArtistAlbums(false);
  };

  const toggleArtistAlbums = () => {
    setShowTopTracks(false);
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
                <CarouselComponent
                  data={topArtists}
                  selected={artistSelected?.id}
                  setId={setId}
                  save={followArtist}
                  unSave={unfollowArtist}
                  link="Artists"
                />
              </Suspense>
            )}
            {carouselFoll && (
              <Suspense fallback={<CardLoader />}>
                <CarouselComponent
                  data={followedArtists}
                  selected={artistSelected?.id}
                  setId={setId}
                  save={followArtist}
                  unSave={unfollowArtist}
                  link="Artists"
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
              </div>
              <div className="artistsPage__tracks">
                {showTopTracks && <Tracks data={artistTopTracks} />}
                {showArtistAlbums && <Albums data={artistAlbums} />}
              </div>
            </div>
            <div className="artistsPage__relatedArtists">
              <ArtistsRelated
                id={id}
                setError={setError}
                artistSelected={artistSelected}
                link={"Artists"}
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
