import { useContext } from "react";
import "./SidebarRight.scss";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import SectionTitle from "../../components/sectionTtitle/SectionTitle";
import Scrollbar from "react-smooth-scrollbar";
import Subtitle from "../../components/subtitle/Subtitle";
import { IoIosArrowDown } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

SmoothScrollbar.use(OverscrollPlugin);

const SidebarRight = () => {
  const props = useContext(AppContext);

  const getRecomended = async (e) => {
    props.handleLoader();
    props.scrollTop();
    const id = e.currentTarget.dataset.id;
    const recommendations = await props.fetchRecomendedGenres(id);
    props.setBannerInfoGenre(id);
    props.setTracks(recommendations.tracks);
    props.setPlaylistToPlay(recommendations.tracks);
  };

  const categories = [
    "chill",
    "pop",
    "sleep",
    "party",
    "metal",
    "rock",
    "jazz",
    "romance",
    "soul",
    "classical",
    "latin",
    "blues",
    "funk",
    "punk",
    "country",
  ];

  const handleClick = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle(
      "sidebarRight__categoryItems__open"
    );
  };

  return (
    <div className="sidebarRight">
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}
        className="scroll__content">
        <Link to="/">
          <div className="sidebarRight__logo">
            <motion.h1 whileHover={{ scale: 1.05 }}>My Spotifly</motion.h1>
          </div>
        </Link>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Categories" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems ">
            {categories.map((category) => {
              return (
                <Link to="/Biblio" key={category}>
                  <Subtitle
                    text={category}
                    id={category}
                    onClick={getRecomended}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Featured playlists" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems">
            {props.featuredPlaylists &&
              props.featuredPlaylists.map((playlist) => {
                return (
                  <Link to="/Biblio" key={playlist.id}>
                    <Subtitle
                      text={playlist.name}
                      id={playlist.id}
                      onClick={props.fetchPlaylistContent}
                      name={playlist.name}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Your Top Tracks" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems">
            {props.topTracks &&
              props.topTracks.map((track) => {
                return (
                  <Link key={track.id} to="/Track">
                    <Subtitle
                      onClick={props.setTrackShow}
                      text={track.name}
                      id={track.id}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Your Top Artists" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems">
            {props.topArtists &&
              props.topArtists.map((artist) => {
                return (
                  <Link key={artist.id} to="/Artist">
                    <Subtitle
                      text={artist.name}
                      onClick={props.setArtistShow}
                      id={artist.id}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Your Saved Albums" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems">
            {props.savedAlbums &&
              props.savedAlbums.map((album) => {
                return (
                  <Link to="/Biblio" key={album.album.id}>
                    <Subtitle
                      text={album.album.name}
                      id={album.album.id}
                      name={album.album.name}
                      onClick={props.getAlbumTracks}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="sidebarRight__categoriesWrapper">
          <div
            className="sidebarRight__categories"
            data-set="categories"
            onClick={handleClick}>
            <SectionTitle padding="0.4rem 0px" title="Followed Artists" />
            <IoIosArrowDown />
          </div>
          <div className="sidebarRight__categoryItems">
            {props.followedArtists &&
              props.followedArtists.map((artist) => {
                return (
                  <Link key={artist.id} to="/Artist">
                    <Subtitle
                      text={artist.name}
                      onClick={props.setArtistShow}
                      id={artist.id}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default SidebarRight;
