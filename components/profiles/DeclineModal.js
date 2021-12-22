import React from 'react';
import Image from 'next/dist/client/image';
import xClose from 'public/abc/xClose.svg';
import { ExclamationIcon } from '@heroicons/react/outline';

export default function DeclineModal({ show, handleClose, handleDeclined }) {
  return (
    <div style={show ? { display: 'block' } : { display: 'none' }}>
      <div
        onClick={handleClose}
        className="z-20 fixed top-0 h-screen left-0 bg-black opacity-30"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>
      <div className="bg-white items-center  z-40 p-8 height-184 width-512 mobile:w-80 mobile:h-max mobile:justify-center justify-between flex w-max   fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded flex-col">
        <div
          onClick={handleClose}
          className="absolute right-6 top-4 cursor-pointer w-max h-max"
        >
          <Image src={xClose} alt="" width={14} height={14} layout="fixed" />
        </div>
        <div className="flex text-left mobile:flex-col mobile:justify-self-center items-center">
          <span className="rounded-full bg-red-100 h-10 w-10 items-center justify-center flex mr-4">
            <ExclamationIcon className="h-6 text-red-700" />
          </span>
          <span>
            <h1 className=" text-gray-900 text-lg">
              Decline Invitation Challenge
            </h1>
            <p className="text-base">
              Are you sure wants to decline this invitation challenge?
            </p>
          </span>
        </div>
        <br />
        <span className="flex justify-end w-full">
          <button
            className=" border border-gray-600 mr-4 px-4 py-1 text-center text-gray-600  rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 px-4 py-1 text-center  text-white   rounded"
            onClick={handleDeclined}
          >
            Decline
          </button>
        </span>
      </div>
    </div>
  );
}
