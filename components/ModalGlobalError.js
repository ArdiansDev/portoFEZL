import React, { useState, useEffect } from 'react';
import { ExclamationIcon, XIcon } from '@heroicons/react/solid';

export default function ModalGlobalError({ error, toast, t }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-max height-78 flex z-20 fixed bottom-5 left-5 bg-gray-100 rounded-xl shadow-lg p-4 ">
        <ExclamationIcon className="text-red-600 w-6 h-6" />

        <div className="width-max-280 ml-3">
          <h1 className="font-bold text-sm leading-5 text-black">{error}</h1>
        </div>
        <button className="ml-4 w-5 h-5" onClick={() => toast.dismiss(t.id)}>
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
    // </div>
  );
}
