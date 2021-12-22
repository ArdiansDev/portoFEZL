import React from 'react';
import Image from 'next/dist/client/image';
import thumbnailJourney from 'public/abc/thumbnailJourney.png';
import { PencilAltIcon } from '@heroicons/react/solid';
import ImageUpload from './ImageUpload';

export default function ItemForm({
  label,
  children,
  type = 'text',
  onUpload,
  thumbnail,
  src,
  ...otherProps
}) {
  console.log('src', src);
  switch (type) {
    case 'text':
      return (
        <>
          <label
            htmlFor={label}
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {label}
          </label>
          <input
            type={type}
            {...otherProps}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
          />
        </>
      );
    case 'textarea':
      return (
        <>
          <label
            htmlFor={label}
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {label}
          </label>
          <textarea
            type={type}
            {...otherProps}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm h-36	"
          />
        </>
      );

    case 'imageUpload':
      return (
        <>
          <label
            htmlFor="journey_thumbnail"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            {label}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2 mb-5 flex mobile:justify-center">
            {src ? (
              <img
                src={src}
                alt=""
                className="object-contain mobile:h-full mobile:h-100 width-300 height-150"
              />
            ) : (
              <div className="mobile:h-full mobile:h-100 width-300 height-150">
                <Image
                  src={thumbnail}
                  alt=""
                  width={400}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
          {/* <label
            htmlFor="journey_thumbnail"
            class="bg-white hover:bg-grey py-2 px-3 rounded-md items-center justify-center border border-gray-300 w-64 flex	cursor-pointer"
          >
            <PencilAltIcon className="text-current mr-2 w-5 text-gray-400 " />
            <span className="text-sm leading-4 font-medium text-gray-700">
              Change Image
            </span>
          </label>
          <input
            id="journey_thumbnail"
            style={{ visibility: 'hidden', display: 'none' }}
            type={'file'}
            onChange={onUpload}
            ></input> */}
          <ImageUpload onUpload={onUpload} />
        </>
      );
  }
}
