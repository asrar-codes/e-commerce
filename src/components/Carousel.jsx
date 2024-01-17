import { carouselData } from "../assets/carouselData";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="slider-container">
      <div className="w-full ">
        <Slider {...settings}>
          {carouselData.map((carousel) => {
            return (
              <img
                key={carousel.id}
                src={carousel.image}
                alt={carousel.name}
                className="slide-image w-full object-cover  max-h-screen mx-auto "
              />
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;
