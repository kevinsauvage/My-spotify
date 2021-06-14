import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CardLoader from "../../components/cardLoader/CardLoader";
import { AppContext } from "../../context/AppContext";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import WentWrong from "../../components/wentWrong/WentWrong";
import Tracks from "../../components/tracks/Tracks";
import ArtistsRelated from "../artists/artistsRelated/ArtistsRelated";
import Albums from "../../components/albums/Albums";

import "./AlbumsPage.scss";
const CarouselAlbums = React.lazy(() =>
  import("./carouselAlbums/CarouselAlbums")
); // Lazy-loaded

const AlbumsPage = () => {
  const { spotifyApi, savedAlbums, recommendedAlbums, fetchArtistAlbums } =
    useContext(AppContext);
  const [id, setId] = useState();
  const [albumSelected, setAlbumSelected] = useState();
  const [recomendedTrack, setRecomendedTrack] = useState([]);
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState();
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTracks, setShowTracks] = useState(true);
  const [showRecommendedTracks, setShowRecommendedTracks] = useState(false);
  const [showRecommendedAlbums, setShowRecommendedAlbums] = useState(true);
  const [showSavedAlbums, setShowSavedAlbums] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    recommendedAlbums && !id && setId(recommendedAlbums?.[0].album?.id);
  }, [recommendedAlbums, id]);

  useEffect(() => {
    const setAlbumShow = async () => {
      try {
        const album = await spotifyApi.getAlbum(id);
        setAlbumSelected(album);
      } catch (error) {
        setError(true);
      }
    }; // Set artist to show on artist show page
    id && setAlbumShow();
  }, [id, spotifyApi]);

  const getArtistAlbums = useCallback(async () => {
    const artistAlbums =
      albumSelected && (await fetchArtistAlbums(albumSelected));
    setArtistAlbums(artistAlbums);
  }, [fetchArtistAlbums, albumSelected]);

  useEffect(() => {
    getArtistAlbums();
  }, [getArtistAlbums]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const tracks = await spotifyApi.getAlbumTracks(id);
        setTracks(tracks.items);
      } catch (error) {
        setError(true);
      }
    };
    id && getTracks();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getRecommendationsTracks = async () => {
      try {
        const tracks = await spotifyApi.getRecommendations({
          seed_artists: albumSelected?.artists?.[0]?.id,
          limit: 10,
        });
        setRecomendedTrack(tracks.tracks);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    albumSelected && getRecommendationsTracks();
  }, [spotifyApi, albumSelected]);

  const toggleShowTracks = () => {
    setShowAlbums(false);
    setShowTracks(true);
    setShowRecommendedTracks(false);
  };
  const toggleShowAlbums = () => {
    setShowAlbums(true);
    setShowTracks(false);
    setShowRecommendedTracks(false);
  };
  const toggleShowRecommendedTraks = () => {
    setShowAlbums(false);
    setShowTracks(false);
    setShowRecommendedTracks(true);
  };
  const toggleShowSavedAlbums = () => {
    setShowSavedAlbums(true);
    setShowRecommendedAlbums(false);
  };
  const toggleShowRecommendedAlbums = () => {
    setShowSavedAlbums(false);
    setShowRecommendedAlbums(true);
  };

  return (
    <div className="albumsPage">
      {!error ? (
        <>
          <div className="albumsPage__carousel">
            <div className="albumsPage__menu">
              <ClickableTitle
                fn={toggleShowRecommendedAlbums}
                condition={showRecommendedAlbums}
                title={`Albums You May Like`}
              />
              <ClickableTitle
                fn={toggleShowSavedAlbums}
                condition={showSavedAlbums}
                title={`Your Favourite Albums`}
              />
            </div>
            {showSavedAlbums && (
              <Suspense fallback={<CardLoader />}>
                {savedAlbums ? (
                  <CarouselAlbums
                    albums={savedAlbums}
                    albumSelected={albumSelected}
                    setId={setId}
                  />
                ) : (
                  <h3>No albums saved yet...</h3>
                )}
              </Suspense>
            )}
            {showRecommendedAlbums && (
              <Suspense fallback={<CardLoader />}>
                <CarouselAlbums
                  albums={recommendedAlbums}
                  albumSelected={albumSelected}
                  setId={setId}
                />
              </Suspense>
            )}
          </div>
          <section className="albumsPage__content">
            <div className="albumsPage__tracksContainer">
              <div className="albumsPage__menu">
                <ClickableTitle
                  condition={showTracks}
                  fn={toggleShowTracks}
                  title={`${albumSelected?.name} Tracks`}
                />
                <ClickableTitle
                  condition={showRecommendedTracks}
                  fn={toggleShowRecommendedTraks}
                  title={`${albumSelected?.artists?.[0]?.name} Recommended Tracks`}
                />
                <ClickableTitle
                  condition={showAlbums}
                  fn={toggleShowAlbums}
                  title={`${albumSelected?.artists?.[0]?.name} Albums`}
                />
              </div>
              <div className="albumsPage__tracks">
                {showTracks && <Tracks data={tracks && tracks} />}
                {showRecommendedTracks && (
                  <Tracks data={recomendedTrack && recomendedTrack} />
                )}
                {showAlbums && <Albums data={artistAlbums} />}
              </div>
            </div>
            {
              <div className="albumsPage__relatedArtists">
                <ArtistsRelated
                  id={albumSelected?.artists?.[0]?.id}
                  setError={setError}
                  artistSelected={albumSelected}
                />
              </div>
            }
          </section>
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default AlbumsPage;
