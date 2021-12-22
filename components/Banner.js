import React from 'react';
import NextImage from 'components/NextImage';
import router from 'next/router';

export default function Banner({ image, href }) {
  return (
    <div
      className={` px-0 sm:height-255 height-195 flex items-center rounded-2xl justify-center ${
        href && 'cursor-pointer'
      }`}
      onClick={() => {
        href && router.push(href);
      }}
    >
      <div className="block">
        <img
          className="w-full sm:height-255 height-195"
          src={image}
          alt=""
          objectFit="contain"
          layout="fill"
        />
      </div>
    </div>
  );
}
