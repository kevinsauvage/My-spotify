import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import responsive from "./responsive";

const CarouselComponent = ({ data, link }) => {
  return (
    <div>
      {data && (
        <Carousel responsive={responsive}>
          {data.map((item) => {
            return (
              <Link
                to={{
                  pathname: link + `/${item.id}`,
                  state: {
                    id: item.id,
                  },
                }}
                key={item.id}>
                <Card
                  url={item?.images?.[1]?.url || item?.album?.images?.[1]?.url}
                  name={item.name}
                  id={item.id}
                  artist={item.artists?.[0].name}
                />
              </Link>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
