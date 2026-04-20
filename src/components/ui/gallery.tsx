"use client";

import Image from "next/image";

const images = [
  "/img11.jpeg",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.jpeg",
  "/img6.png",
  "/img8.png",
  "/img7.png",
  "/img9.png",
  "/img10.jpeg",
  "/img1.png",
  "/img12.jpeg"
];

export default function Gallery() {
  return (
    <section className="w-full bg-transparent py-5 ">
      <div className="max-w-5xl mx-auto px-4">
        <div className="columns-2 md:columns-3 gap-6 [column-fill:_balance]">
          {images.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-6 rounded-2xl overflow-hidden"
            >
              <Image
                src={src}
                alt="gallery"
                width={500}
                height={500}
                className="
                  w-full h-auto object-cover rounded-2xl
                  transition-transform 
                  hover:scale-[1.04]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
