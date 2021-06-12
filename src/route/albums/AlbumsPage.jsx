import React, { Suspense, useContext, useEffect, useState } from "react";
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
  const { spotifyApi } = useContext(AppContext);
  const [savedAlbums, setSavedAllbums] = useState();
  const [id, setId] = useState();
  const [albumSelected, setAlbumSelected] = useState();
  const [error, setError] = useState(false);
  const [tracks, setTracks] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTracks, setShowTracks] = useState(true);

  useEffect(() => {
    const fetchSavedAlbums = async () => {
      try {
        const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
        const savedAlbums = response.items.map((album) => album.album);
        const onlyAlbums = savedAlbums.filter((item) => {
          if (item.album_type !== "compilation") return item;
        });
        setSavedAllbums(onlyAlbums);
        setId(savedAlbums[0].id);
      } catch (error) {
        setError(true);
      }
    };
    fetchSavedAlbums();
  }, [spotifyApi]);

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

  useEffect(() => {
    const fetchArtistAlbums = async () => {
      const artistAlbums = await spotifyApi.getArtistAlbums(
        albumSelected?.artists[0].id
      );
      const unique = artistAlbums.items.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === thing.place && t.name === thing.name
          )
      );
      const sorted = unique.sort((a, b) => a.release_date > b.release_date);
      setArtistAlbums(sorted);
      console.log(sorted);
    };
    albumSelected && fetchArtistAlbums();
  }, [albumSelected, spotifyApi]);

  console.log(artistAlbums);

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

  const toggleShowTracks = () => {
    setShowAlbums(false);
    setShowTracks(true);
  };
  const toggleShowAlbums = () => {
    setShowAlbums(true);
    setShowTracks(false);
  };

  return (
    <div className="albumsPage">
      {!error ? (
        <>
          <div className="albumsPage__carousel">
            <div className="albumsPage__menu">
              <ClickableTitle title={`Favorite Albums`} />
            </div>
            <Suspense fallback={<CardLoader />}>
              <CarouselAlbums
                albums={savedAlbums}
                albumSelected={albumSelected}
                setId={setId}
              />
            </Suspense>
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
                  title={`${albumSelected?.artists[0].name} Albums`}
                />
              </div>
              <div className="albumsPage__tracks">
                {showTracks && <Tracks data={tracks && tracks} />}
                {showAlbums && <Albums data={artistAlbums} />}
              </div>
            </div>
            {
              <div className="albumsPage__relatedArtists">
                <ArtistsRelated
                  id={albumSelected?.artists[0].id}
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
