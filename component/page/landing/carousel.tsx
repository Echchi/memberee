import React, { useEffect, useState } from "react";
import Image from "next/image";
import first_image from "/public/image/landing/1.png";
import second_image from "/public/image/landing/2.png";
import third_image from "/public/image/landing/3.png";
import fourth_image from "/public/image/landing/4.png";
import fifth_image from "/public/image/landing/5.png";
import { AnimatePresence, motion } from "framer-motion";

const Carousel = () => {
  const images = [
    first_image,
    second_image,
    third_image,
    fourth_image,
    fifth_image,
  ];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const imageTimeOut = setTimeout(() => {
      if (imageIndex < 4) {
        setImageIndex((index) => index + 1);
      } else if (imageIndex === 4) {
        setImageIndex(0);
      }
    }, 4000);
    return () => clearTimeout(imageTimeOut);
  }, [imageIndex]);

  return (
    <div className="flex items-end mb-4 md:mb-10 md:h-32">
      <div className="relative overflow-hidden h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={imageIndex}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            <Image
              src={images[imageIndex]}
              alt={`lading_image_${imageIndex}`}
              fill={false}
              sizes="cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
