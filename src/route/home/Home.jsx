import { useContext } from "react";
import "./Home.scss";
import { AppContext } from "../../context/AppContext";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";

const Home = () => {
  const {
    topTracks,
    getAlbumTracks,
    setTrackShow,
    savedAlbums,
    topArtists,
    setArtistShow,
    newReleases,
  } = useContext(AppContext);

  const dataConfig = [
    {
      items: newReleases,
      title: "NEW RELEASES",
      fn: getAlbumTracks,
      link: "/biblio",
    },
    {
      items: topTracks,
      title: "YOUR TOP TRACKS",
      fn: setTrackShow,
      link: "/track",
    },
    {
      items: topArtists,
      title: "YOUR TOP ARTISTS",
      fn: setArtistShow,
      link: "/Artist",
    },
    {
      items: savedAlbums,
      title: "YOUR ALBUMS",
      fn: getAlbumTracks,
      link: "/biblio",
    },
  ];

  return (
    <div className="home">
      {dataConfig.map((data) => (
        <div className="space">
          <CarouselContainer data={data} />
        </div>
      ))}
    </div>
  );
};

export default Home;
