import React, { useState, useEffect } from "react";

const photos = [
  "img/jordan.jpg",
  "img/jordan2.jpg",
  "img/jordan3.jpg"
];

const altTexts = [
  "Jordan 1",
  "Jordan 2",
  "Jordan 3"
];

function PhotoHolder() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-[95%] h-[300px] mx-auto overflow-hidden">
      {photos.map((photo, index) => (
        <img
          key={index}
          className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-1000 ease-in-out ${currentPhotoIndex === index ? 'opacity-100' : 'opacity-0'}`}
          src={photo}
          alt={altTexts[index]}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="bg-gradient-to-r from-red-600 via-orange-500 to-white inline-block text-transparent bg-clip-text text-3xl font-bold px-4 py-2">Make Jordan Great Again.</h2>
      </div>
    </div>
  );
}

export default PhotoHolder;
