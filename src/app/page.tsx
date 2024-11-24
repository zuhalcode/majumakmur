"use client";

import CustomImage from "@/components/custom-image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingBag } from "lucide-react";

const banners = [
  {
    title: "love",
    name: "PRS Chronograph",
    desc: "",
    category: "Men's Watch",
    src: "/images/banner.jpg",
  },
  {
    title: "time",
    name: "1 CT. T.W. pear shaped ",
    desc: "diamond vintage-style ring in",
    category: "14K white gold",
    src: "/images/banner2.jpg",
  },
  { title: "love collection", src: "/images/banner.jpg" },
];

export default function Page() {
  return (
    <>
      <main className="bg-zinc-950">
        <div className="w-full p-3 md:p-5 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
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

          <div className="flex flex-col items-center justify-center">
            <h1 className="uppercase text-2xl md:text-3xl xl:text-4xl text-center">
              Maju Makmur
            </h1>
            <p className="uppercase text-[10px] tracking-wider text-center">
              Jewelry Store
            </p>
          </div>

          <div className="">
            <ShoppingBag />
          </div>
        </div>

        <Carousel
          className="w-full px-5 xl:px-20"
          autoplay
          autoplayInterval={10000}
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

                    <div className="font-semibold space-y-1 uppercase leading-6">
                      <h1 className="text-3xl md:text-7xl lg:text-[7rem]">
                        {title}
                      </h1>
                      <h1 className="text-[1.7rem] md:text-5xl lg:text-6xl xl:text-7xl">
                        collection
                      </h1>

                      <div className="uppercase font-medium text-sm mt-2 text-zinc-200 tracking-normal leading-loose">
                        <h2>{name}</h2>
                        <h2>{desc}</h2>
                        <h2>{category}</h2>
                      </div>

                      <Button variant="outline">See the Collection</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>

        <div className=" w-full h-screen"></div>
      </main>
    </>
  );
}
