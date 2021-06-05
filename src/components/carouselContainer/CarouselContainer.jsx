import CarouselComponent from "../carousel/CarouselComponent";
import SectionTitle from "../sectionTtitle/SectionTitle";

const CarouselContainer = ({ data }) => {
  return (
    <>
      <SectionTitle title={data?.title} />
      <CarouselComponent
        data={data?.items}
        link={data?.link}
        onClick={data?.fn}
      />
    </>
  );
};

export default CarouselContainer;
