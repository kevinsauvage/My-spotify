import React, { useContext } from "react";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import "../assets/stylesheets/pages/Home.scss";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const props = useContext(AppContext);
  return (
    <div className="home">
      <div className="home__new-release space">
        <SectionTitle title="NEW RELEASES" />
        <div className="home__cards">
          {props.newReleases &&
            props.newReleases.map((newrelease) => {
              let bg = newrelease.images[1].url;
              return (
                <Link to="/Biblio" key={newrelease.id}>
                  <Card
                    url={bg}
                    name={newrelease.name}
                    id={newrelease.id}
                    onClick={props.getAlbumTracks}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home__topTracks space">
        <SectionTitle title="YOUR TOP TRACKS" />
        <div className="home__cards">
          {props.topTracks &&
            props.topTracks.map((topTrack) => {
              let bg = topTrack.album.images[0].url;
              return (
                <Link to="/track" key={topTrack.id}>
                  <Card
                    onClick={props.setTrackShow}
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
      <div className="home__featuredPlaylist space">
        <SectionTitle title="FEATURED PLAYLIST" />
        <div className="home__cards">
          {props.featuredPlaylists &&
            props.featuredPlaylists.map((playlist) => {
              let bg = playlist.images[0].url;
              return (
                <Link to="/Biblio" key={playlist.id}>
                  <Card
                    url={bg}
                    onClick={props.fetchPlaylistContent}
                    id={playlist.id}
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home__topArtist space">
        <SectionTitle title="YOUR TOP ARTISTS" />
        <div className="home__cards">
          {props.topArtists &&
            props.topArtists.map((topArtist) => {
              let bg = topArtist.images[2].url;
              return (
                <Link to="/Artist" key={topArtist.id}>
                  <Card
                    url={bg}
                    name={topArtist.name}
                    onClick={props.setArtistShow}
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
          {props.savedAlbums &&
            props.savedAlbums.map((savedAlbum) => {
              let bg = savedAlbum.album.images[1].url;
              return (
                <Link key={savedAlbum.album.id} to="/Biblio">
                  <Card
                    url={bg}
                    name={savedAlbum.album.name}
                    id={savedAlbum.album.id}
                    onClick={props.getAlbumTracks}
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
