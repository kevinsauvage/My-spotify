import Carousel from "react-multi-carousel";
import responsive from "../carousel/responsive";
import TextLoader from "../textLoader/TextLoader";
import "./CardLoader.scss";
import "react-multi-carousel/lib/styles.css";

const CardLoader = () => {
  const array = Array.from(Array(8).keys());
  return (
    <div className="carousel-loader">
      <TextLoader height="15px" width="150px" />
      <Carousel responsive={responsive}>
        {array.map((e) => {
          return <div className="cardLoader" key={e}></div>;
        })}
      </Carousel>
    </div>
  );
};

export default CardLoader;
