


import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { API_BASE_URL } from "@/services/api";

const BookImageSlider = ({ images = [] }) => {

  const getImageUrl = (img) => {
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}${img}`;
};

  

  if (images.length === 0) return null;

  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <img
              // src={`${API_BASE_URL}${img}`}
              src={getImageUrl(img)}
              alt={`Book image ${i + 1}`}
              className="h-48 w-full object-cover rounded"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BookImageSlider;
