import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const reorderItems = [
  {
    name: "Macbook Pro",
    imageSrc:
      "https://m.media-amazon.com/images/I/41S2OSRfBuL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    name: "Iphone 14 pro",
    imageSrc:
      "https://m.media-amazon.com/images/I/51UtM-A3fdL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    name: "Zoom75",
    imageSrc:
      "https://m.media-amazon.com/images/I/71GL8OC6isL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    name: "Airpods Pro",
    imageSrc:
      "https://m.media-amazon.com/images/I/419yjKznzbL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    name: "Samsung Galaxy Fold",
    imageSrc:
      "https://m.media-amazon.com/images/I/61Jjxzg7Q1L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    name: "Logitech Mouse",
    imageSrc:
      "https://m.media-amazon.com/images/I/61xgpXecLML._AC_UY327_FMwebp_QL65_.jpg",
  },
];

export function ReOrderSoon() {
  return (
    <div className="w-full my-16">
      <h2 className="text-xl font-semibold mb-4">Re-Order Soon!</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {reorderItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div className="p-2">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center gap-4 p-3">
                    <div className="relative h-8 w-8">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
