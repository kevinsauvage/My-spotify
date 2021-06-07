import { useContext, useEffect } from "react";
import "./Home.scss";
import { AppContext } from "../../context/AppContext";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import CardLoader from "../../components/cardLoader/CardLoader";

const Home = () => {
  const {
    topTracks,
    getAlbumTracks,
    setTrackShow,
    savedAlbums,
    topArtists,
    setArtistShow,
    newReleases,
    setIsLoading,
  } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const dataConfig = [
    {
      id: 1,
      items: newReleases,
      title: "NEW RELEASES",
      link: "/biblio",
    },
    {
      id: 2,
      items: topTracks,
      title: "YOUR TOP TRACKS",
      link: "/track",
    },
    {
      id: 3,
      items: topArtists,
      title: "YOUR TOP ARTISTS",
      link: "/artist",
    },
    {
      id: 4,
      items: savedAlbums,
      title: "YOUR ALBUMS",
      link: "/biblio",
    },
  ];

  const array = Array.from(Array(6).keys()); // Make an array to display 8 card loader carussel

  return (
    <div className="home">
      {savedAlbums && topArtists && topTracks && newReleases
        ? dataConfig.map((data) => {
            return (
              <div className="space" key={data.id}>
                <CarouselContainer data={data} />
              </div>
            );
          })
        : array.map((e) => {
            return <CardLoader key={e} />;
          })}
    </div>
  );
};

export default Home;
