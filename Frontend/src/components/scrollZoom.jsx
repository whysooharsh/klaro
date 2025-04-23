import React, { useEffect, useState } from "react";

const ScrollZoomVideo = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let ticking = false;
  
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const newScale = Math.min(1 + scrollY / 1000, 1.3);
          setScale(newScale);
          ticking = false;
        });
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return (
    <div className="h-auto bg-transparent flex items-start justify-center overflow-hidden">
      <div className="top-20 z-50 relative w-full max-w-4xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl md:text-5xl font-bold text-center px-4">
          Stay ahead of the style curve
        </div>

        <video
          className="rounded-xl shadow-xl w-full h-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            transition: "transform 0.2s ease-out",
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dpwqggym0/video/upload/v1745229518/6008028_4k_Beautiful_3840x2160_pu3wzj.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ScrollZoomVideo;
