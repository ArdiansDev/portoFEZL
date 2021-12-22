import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
export default function DownloadModal({ Show, setShow }) {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  return (
    // <div className="fixed top-5 left-2">
    <motion.div
      initial={false}
      animate={Show ? 'open' : 'closed'}
      variants={variants}
    >
      <div className=" width-384 height-98 flex z-20 fixed bottom-5 left-5 bg-gray-100 rounded-xl shadow-lg p-5 ">
        <DownloadIcon className="text-indigo-900 min-width-16 height-16" />
        <div className="width-max-280 mx-4">
          <h1 className="font-bold text-sm">Your report is processing </h1>
          <p className="text-sm">
            Please wait for download completion, or visit{' '}
            <a className="text-base-600" href="/admin/usage-log">
              Download Logs
            </a>{' '}
            in a few minutes.
          </p>
        </div>
        <button
          className="min-width-12 height-12"
          onClick={() => {
            setShow(false);
          }}
        >
          <XIcon />
        </button>
      </div>
    </motion.div>
    // </div>
  );
}
