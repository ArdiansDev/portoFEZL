/* This example requires Tailwind CSS v2.0+ */
import 'rc-calendar/assets/index.css';
import React from 'react';

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CompletionCard({ Title, description, total, icon }) {
  return (
    <div className="bg-white width-screen-20 w-full shadow  height-115 rounded-lg  mobile:mt-2 items-center px-6 py-5 mobile:p-4 flex  mobile:h-max mobile:w-full">
      {icon}
      <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
        <h1 className="text-base mb:text-base text-gray-900">{Title}</h1>
        <h2 className="text text-blue-600 text-2xl	">
          {total}
          <a className=" pl-2 text-sm	 text-gray-500 font-normal">
            {description}
          </a>
        </h2>
      </div>
    </div>
  );
}
