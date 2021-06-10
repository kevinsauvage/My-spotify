import "./Home.scss";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import CardLoader from "../../components/cardLoader/CardLoader";
import WentWrong from "../../components/wentWrong/WentWrong";
import HomeLogic from "./HomeLogic";

const Home = () => {
  const {
    array,
    dataConfig,
    dataFetch,
    error,
    savedAlbums,
    topArtists,
    topTracks,
    newReleases,
  } = HomeLogic();

  return (
    <div className="home">
      {error && <WentWrong title="Oups... Something went wrong!" btn />}
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

      {dataFetch
        ? dataFetch.map((data) => {
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
