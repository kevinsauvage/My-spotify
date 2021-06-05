import Carousel from "react-multi-carousel";
import responsive from "../carousel/responsive";
import TextLoader from "../textLoader/TextLoader";
import "./CardLoader.scss";

const CardLoader = () => {
  const array = Array.from(Array(8).keys());
  return (
    <>
      <TextLoader height="15px" width="150px" />
      <Carousel responsive={responsive}>
        {array.map((e) => {
          return <div className="cardLoader" key={e}></div>;
        })}
      </Carousel>
    </>
  );
};

export default CardLoader;
