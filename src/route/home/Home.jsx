import { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { AppContext } from "../../context/AppContext";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import CardLoader from "../../components/cardLoader/CardLoader";

const Home = () => {
  const [topTracks, setTopTracks] = useState([]); // user top tracks
  const [topArtists, setTopArtists] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]); // user saved albums
  const [newReleases, setNewReleases] = useState();

  const { spotifyApi, handleSidebarMenu, scrollbar } = useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const tracks = response.items;
      setTopTracks(tracks);
    };
    getTopTracks();
  }, [spotifyApi, setTopTracks, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getTopArtist = async () => {
      const topArtist = await spotifyApi.getMyTopArtists();
      setTopArtists(topArtist.items);
    };
    getTopArtist();
  }, [setTopArtists, spotifyApi]);

  useEffect(() => {
    const getSavedAlbums = async () => {
      const response = await spotifyApi.getMySavedAlbums({ limit: 50 });
      const albums = response.items.map((item) => item.album);
      setSavedAlbums(albums);
    }; // Fetching the Albums saved by the user
    getSavedAlbums();
  }, [spotifyApi]);

  useEffect(() => {
    const getNewReleases = async () => {
      const response = await spotifyApi.getNewReleases({ limit: 50 });
      setNewReleases(response.albums.items);
    };
    getNewReleases();
  }, [spotifyApi]);

  const dataConfig = [
    {
      id: 1,
      items: newReleases,
      title: "NEW RELEASES",
      link: "/album",
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
      link: "/album",
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
