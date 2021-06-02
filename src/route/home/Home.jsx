import { useContext, useEffect, useState } from "react";
import "./Home.scss";
import Card from "../../components/card/Card";
import SectionTitle from "../../components/sectionTtitle/SectionTitle";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    spotifyApi,
    topTracks,
    getAlbumTracks,
    setTrackShow,
    savedAlbums,
    topArtists,
    setArtistShow,
  } = useContext(AppContext);

  const [newReleases, setNewReleases] = useState();

  useEffect(() => {
    const getNewReleases = async () => {
      const response = await spotifyApi.getNewReleases({ limit: 50 });
      setNewReleases(response.albums.items);
    };
    getNewReleases();
  }, [spotifyApi]);

  return (
    <div className="home">
      <div className="home__new-release space">
        <SectionTitle title="NEW RELEASES" />
        <div className="home__cards">
          {newReleases &&
            newReleases.map((newrelease) => {
              let bg = newrelease.images[1].url;
              return (
                <Link to="/Biblio" key={newrelease.id}>
                  <Card
                    url={bg}
                    name={newrelease.name}
                    id={newrelease.id}
                    onClick={getAlbumTracks}
                    artist={newrelease.artists[0].name}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home__topTracks space">
        <SectionTitle title="YOUR TOP TRACKS" />
        <div className="home__cards">
          {topTracks &&
            topTracks.map((topTrack) => {
              let bg = topTrack.album.images[0].url;
              return (
                <Link to="/track" key={topTrack.id}>
                  <Card
                    onClick={setTrackShow}
                    url={bg}
                    id={topTrack.id}
                    name={topTrack.name}
                    artist={topTrack.album.artists[0].name}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home__topArtist space">
        <SectionTitle title="YOUR TOP ARTISTS" />
        <div className="home__cards">
          {topArtists &&
            topArtists.map((topArtist) => {
              let bg = topArtist.images[2].url;
              return (
                <Link to="/Artist" key={topArtist.id}>
                  <Card
                    url={bg}
                    name={topArtist.name}
                    onClick={setArtistShow}
                    id={topArtist.id}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home__savedAlbums">
        <SectionTitle title="YOUR ALBUMS" />
        <div className="home__cards">
          {savedAlbums &&
            savedAlbums.map((savedAlbum) => {
              let bg = savedAlbum.album.images[1].url;
              return (
                <Link key={savedAlbum.album.id} to="/Biblio">
                  <Card
                    url={bg}
                    name={savedAlbum.album.name}
                    id={savedAlbum.album.id}
                    onClick={getAlbumTracks}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
