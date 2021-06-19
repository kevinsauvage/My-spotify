import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  lazy,
} from "react";
import CardLoader from "../../components/cardLoader/CardLoader";
import { AppContext } from "../../context/AppContext";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import WentWrong from "../../components/wentWrong/WentWrong";
import Tracks from "../../components/tracks/Tracks";
import ArtistsRelated from "../../components/artistsRelated/ArtistsRelated";
import Albums from "../../components/albums/Albums";
import "./AlbumsPage.scss";

const CarouselComponent = lazy(() =>
  import("../../components/carousel/CarouselComponent")
); // Lazy-loaded

const AlbumsPage = () => {
  const {
    spotifyApi,
    savedAlbums,
    recommendedAlbums,
    fetchArtistAlbums,
    checkIfTrackIsSaved,
    saveAlbum,
    unSaveAlbum,
  } = useContext(AppContext);

  const [id, setId] = useState();
  const [albumSelected, setAlbumSelected] = useState();
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState();
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTracks, setShowTracks] = useState(true);
  const [showRecommendedAlbums, setShowRecommendedAlbums] = useState(true);
  const [showSavedAlbums, setShowSavedAlbums] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    recommendedAlbums && !id && setId(recommendedAlbums?.[0].item?.id);
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
      albumSelected &&
      (await fetchArtistAlbums(albumSelected?.artists?.[0]?.id));
    setArtistAlbums(artistAlbums);
  }, [fetchArtistAlbums, albumSelected]);

  useEffect(() => {
    getArtistAlbums();
  }, [getArtistAlbums]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const tracks = await spotifyApi.getAlbumTracks(id);
        const trackWithFollow = await checkIfTrackIsSaved(tracks.items);
        setTracks(trackWithFollow);
      } catch (error) {
        setError(true);
      }
    };
    id && getTracks();
  }, [id, spotifyApi, checkIfTrackIsSaved]);

  const toggleShowTracks = () => {
    setShowAlbums(false);
    setShowTracks(true);
  };
  const toggleShowAlbums = () => {
    setShowAlbums(true);
    setShowTracks(false);
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
                  <CarouselComponent
                    data={savedAlbums}
                    selected={albumSelected?.id}
                    setId={setId}
                    save={saveAlbum}
                    unSave={unSaveAlbum}
                    link="Albums"
                  />
                ) : (
                  <h3>No albums saved yet...</h3>
                )}
              </Suspense>
            )}
            {showRecommendedAlbums && (
              <Suspense fallback={<CardLoader />}>
                <CarouselComponent
                  data={recommendedAlbums}
                  selected={albumSelected?.id}
                  setId={setId}
                  save={saveAlbum}
                  unSave={unSaveAlbum}
                  link="Albums"
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
                  condition={showAlbums}
                  fn={toggleShowAlbums}
                  title={`${albumSelected?.artists?.[0]?.name} Albums`}
                />
              </div>
              <div className="albumsPage__tracks">
                {showTracks && <Tracks data={tracks && tracks} />}
                {showAlbums && <Albums data={artistAlbums} />}
              </div>
            </div>
            <div className="albumsPage__relatedArtists">
              <ArtistsRelated
                id={albumSelected?.artists?.[0]?.id}
                setError={setError}
                artistSelected={albumSelected}
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

export default AlbumsPage;
