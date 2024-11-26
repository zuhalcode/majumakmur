import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import React from "react";

type Props = {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

const CustomImage = ({ src, alt, className }: Props) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt || ""}
        objectFit="cover"
        layout="fill"
        priority
      />
    </div>
  );
};

export default CustomImage;
