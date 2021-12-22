import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationIcon,
  XIcon,
} from '@heroicons/react/solid';

export default function ModalAlert({ Show, setShow, statusAndRemarks }) {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  return (
    <motion.div
      initial={false}
      animate={Show ? 'open' : 'closed'}
      variants={variants}
    >
      <div className="w-max height-78 flex z-20 fixed bottom-5 left-5 bg-gray-100 rounded-xl shadow-lg p-4 ">
        {statusAndRemarks?.status === 'success' ? (
          <CheckCircleIcon className="text-green-600 w-6 h-6" />
        ) : (
          <ExclamationIcon className="text-red-600 w-6 h-6" />
        )}

        <div className="width-max-280 ml-3">
          <h1 className="font-bold text-sm leading-5 text-black">
            {statusAndRemarks?.status === 'success'
              ? 'Successful.'
              : 'Unsuccessful.'}
          </h1>
          <p className="text-sm leading-5 font-normal text-gray-800">
            {statusAndRemarks?.remarks}
          </p>
        </div>
        <button
          className="ml-4 w-5 h-5"
          onClick={() => {
            setShow(false);
          }}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
    // </div>
  );
}
