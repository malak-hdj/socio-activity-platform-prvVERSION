import { useEffect, useState } from "react";

import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";

const heroImages = [hero1, hero2, hero3];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // 🔁 Auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000); // change every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pb-10">
      <div className="w-full max-w-[1336px]">

        {/* TEXT PART (unchanged) */}
        <div className="flex flex-col gap-5 mb-8">
          <h1 className="text-[#2F343B] font-extrabold tracking-[-2px] text-[48px]">
            Explore Your Next Experience
          </h1>

          <p className="text-[#7A8088] max-w-[600px]">
            Discover activities, announcements and shared moments across the platform.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() =>
                document
                  .getElementById("activities")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-3 rounded-lg bg-[#ED8D31] text-white"
            >
              Explore activities
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("announcements")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-3 rounded-lg border"
            >
              View announcements
            </button>
          </div>
        </div>

        {/* IMAGE SLIDER */}
        <div className="relative h-[600px] rounded-[30px] overflow-hidden">

          {/* Images */}
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-[42px] font-bold">
              Stay Updated,<br />Stay Connected
            </h2>

            <p className="max-w-[500px] mt-3">
              A modern platform for employees to explore activities and stay informed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}