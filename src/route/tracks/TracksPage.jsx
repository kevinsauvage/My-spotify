import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import Albums from "../../components/albums/Albums";
import CardLoader from "../../components/cardLoader/CardLoader";
import ArtistsRelated from "../../components/artistsRelated/ArtistsRelated";

const CarouselComponent = lazy(() =>
  import("../../components/carousel/CarouselComponent")
); // Lazy-loaded

const TracksPage = () => {
  const {
    savedTracks,
    spotifyApi,
    checkIfTrackIsSaved,
    fetchArtistAlbums,
    saveTrack,
    unSaveTrack,
  } = useContext(AppContext);
  const [recomendedTracks, setRecomendedTracks] = useState([]);
  const [trackSelected, setTrackSelected] = useState();
  const [showAlbums, setShowAlbums] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [showRecomended, setShowRecomended] = useState(true);
  const [id, setId] = useState();
  const [tracks, setTracks] = useState();

  useEffect(() => {
    savedTracks && !id && setId(savedTracks?.[2]?.item?.id);
  }, [savedTracks, id]);

  useEffect(() => {
    const setTrackShow = async () => {
      try {
        const track = await spotifyApi.getTrack(id);
        setTrackSelected(track);
      } catch (error) {
        console.log(error);
      }
    }; // Set track to show on artist show page
    id && setTrackShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getRecommendationsTracks = async () => {
      try {
        const tracks = await spotifyApi.getRecommendations({
          seed_tracks: trackSelected.id,
          limit: 10,
        });
        setTracks(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    trackSelected && getRecommendationsTracks();
  }, [spotifyApi, trackSelected]);

  const checkIfSaved = useCallback(
    async (tracks) => {
      const tracksWithFollow = await checkIfTrackIsSaved(tracks);
      setRecomendedTracks(tracksWithFollow);
    },
    [checkIfTrackIsSaved]
  );

  useEffect(() => {
    tracks && checkIfSaved(tracks.tracks);
  }, [tracks, checkIfSaved]);

  const getArtistAlbums = useCallback(async () => {
    const artistAlbums =
      trackSelected &&
      (await fetchArtistAlbums(trackSelected?.artists?.[0]?.id));
    setArtistAlbums(artistAlbums);
  }, [fetchArtistAlbums, trackSelected]);

  useEffect(() => {
    getArtistAlbums();
  }, [getArtistAlbums]);

  const toggleShowRecommended = () => {
    setShowRecomended(true);
    setShowAlbums(false);
  };

  const toggleShowAlbums = () => {
    setShowRecomended(false);
    setShowAlbums(true);
  };

  return (
    <div className="albumsPage">
      <div className="albumsPage__carousel">
        <div className="albumsPage__menu">
          <ClickableTitle title={`Tracks You Liked`} />
        </div>
        <Suspense fallback={<CardLoader />}>
          <CarouselComponent
            data={savedTracks}
            selected={id}
            setId={setId}
            save={saveTrack}
            unSave={unSaveTrack}
            link="Tracks"
          />
        </Suspense>
      </div>
      <section className="artistsPage__content">
        <div className="artistsPage__tracksContainer">
          <div className="artistsPage__menu">
            <ClickableTitle
              condition={showRecomended}
              fn={toggleShowRecommended}
              title={`${trackSelected?.name} Similar Tracks`}
            />
            <ClickableTitle
              condition={showAlbums}
              fn={toggleShowAlbums}
              title={`${trackSelected?.artists?.[0]?.name} Albums`}
            />
          </div>
          <div className="artistsPage__tracks">
            {showRecomended && <Tracks data={recomendedTracks} />}
            {showAlbums && <Albums data={artistAlbums} />}
          </div>
        </div>
        <div className="albumsPage__relatedArtists">
          <ArtistsRelated
            id={trackSelected?.artists?.[0]?.id}
            artistSelected={trackSelected}
            link="Artists"
          />
        </div>
      </section>
    </div>
  );
};

export default TracksPage;
