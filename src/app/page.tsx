"use client";

import CustomImage from "@/components/custom-image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { lato, libreBaskerville } from "@/fonts";
import { cn } from "@/lib/utils";
import { Menu, ShoppingBag } from "lucide-react";

const banners = [
  {
    title: "love",
    name: "1 CT. T.W. pear shaped ",
    desc: "diamond vintage-style ring",
    category: "14K white gold",
    src: "/images/banner.jpg",
  },
  {
    title: "time",
    name: "PRS Chronograph",
    desc: "",
    category: "Men's Watch",
    src: "/images/banner2.jpg",
  },
  { title: "love collection", src: "/images/banner.jpg" },
];

const products = [
  { id: 1, name: "Gold Ring", price: "200000", img: "/images/ring.jpg" },
  {
    id: 2,
    name: "Gold Necklace",
    price: "6000000",
    img: "/images/necklace2.jpg",
  },
  {
    id: 3,
    name: "Gold Bracelet",
    price: "3200000",
    img: "/images/bracelet.jpg",
  },
  {
    id: 4,
    name: "Gold Earrings",
    price: "1800000",
    img: "/images/earring.jpg",
  },
  {
    id: 5,
    name: "Gold Pendant",
    price: "1200000",
    img: "/images/necklace.jpg",
  },
  {
    id: 6,
    name: "Gold Pendant",
    price: "1200000",
    img: "/images/necklace.jpg",
  },
];

export default function Page() {
  return (
    <>
      <main className="bg-zinc-950">
        <div className="w-full p-3 md:p-5 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild className="xl:hidden">
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent className="h-screen ">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <ul className="grid gap-4 py-4  px-10">
                <li className="text-3xl">Home</li>
                <li className="text-3xl">Work</li>
                <li className="text-3xl">About</li>
                <li className="text-3xl">Contact</li>
              </ul>
            </SheetContent>
          </Sheet>

          <div className="flex flex-col items-center justify-center xl:mx-auto">
            <h1 className="uppercase text-2xl md:text-3xl xl:text-5xl text-center">
              Maju Makmur
            </h1>
            <p className="uppercase text-[10px] tracking-wider text-center">
              Jewelry Store
            </p>
          </div>

          <div className="xl:hidden">
            <ShoppingBag />
          </div>
        </div>

        {/* Navigation */}
        <nav className="w-full hidden py-3 xl:flex items-center justify-center">
          <span className="text-base hover:underline underline-offset-2 cursor-pointer font-semibold">
            Home
          </span>
        </nav>
        {/* Navigation */}

        {/* Banner */}
        <Carousel
          className="w-full px-5 xl:px-20"
          autoplay
          autoplayInterval={3000}
        >
          <div className="bg-zinc-900 pb-5">
            <CarouselContent className="">
              {banners.map(({ src, title, name, desc, category }, index) => (
                <CarouselItem key={index}>
                  <div className=" px-5 pt-5 space-y-4 md:flex md:py-24 gap-10 items-center justify-center">
                    <CustomImage
                      src={src}
                      className="w-full mx-auto h-44 md:h-80 md:w-1/2 md:mx-0 lg:h-[574px] lg:w-[453px] xl:w-[481px] xl:h-[610px]"
                    />

                    <div
                      className={cn(
                        "font-semibold space-y-1 uppercase leading-6",
                        libreBaskerville.style
                      )}
                    >
                      <h1 className="text-3xl md:text-7xl lg:text-[7rem]">
                        {title}
                      </h1>
                      <h1 className="text-[1.7rem] md:text-5xl lg:text-6xl xl:text-7xl">
                        collection
                      </h1>

                      <div
                        className={cn(
                          "uppercase font-medium text-sm mt-2 text-zinc-200 tracking-normal leading-loose py-5"
                        )}
                      >
                        <h2>{name}</h2>
                        <h2>{desc}</h2>
                        <h2>{category}</h2>
                      </div>

                      <Button
                        variant="outline"
                        className={cn(
                          "rounded-none p-8 text-lg italic border-2 bg-transparent text-amber-500 border-amber-500 hover:border-white",
                          libreBaskerville.className
                        )}
                      >
                        See the Collection
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
        {/* Banner */}

        {/* List Product */}
        <div className="w-11/12 mx-auto px-1 py-16 h-screen space-y-4">
          <div className="">
            <h1 className="text-center text-3xl">Our Products</h1>
            <p className="text-base text-center">
              Add our product to weekly lineup
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
            autoplay
            autoplayInterval={3000}
          >
            <CarouselContent>
              {products.map(({ id, name, img, price }) => (
                <CarouselItem
                  key={id}
                  className="xl:basis-1/6 md:basis-1/3 space-y-3"
                >
                  <div className="flex relative aspect-square bg-transparent items-center justify-center p-1">
                    <CustomImage src={img} className="w-full h-full" />
                  </div>

                  <div className={cn("", lato.className)}>
                    <p className="font-semibold text-sm text-center text-amber-500">
                      Gold
                    </p>
                    <p className="text-lg font-semibold text-center mt-3">
                      {name}
                    </p>
                    <p className="text-base font-semibold text-center text-amber-400">
                      Rp. {price}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* List Product */}
      </main>
    </>
  );
}
