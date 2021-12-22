import React from 'react';
import StampsPass from './StampsPass';
import NextImage from 'components/NextImage';

export default function Stamps({ data }) {
  return (
    <div className="shadow  bg-white min-width-150 max-width-220  rounded-lg text-center p-4 flex flex-col items-center  text-black space-y-2">
      <div className="h-full flex items-center justify-center ">
        <NextImage src={data?.image} alt="" width="72" height="72" />
        {/* <StampsPass width={96} height={96} /> */}
      </div>
      <h2 className="w-full break-words felx flex-wrap flex-col h-max reg-12 mt-0">
        {data?.name}
      </h2>
    </div>
  );
}
