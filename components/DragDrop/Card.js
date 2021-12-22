import { ViewGridIcon } from '@heroicons/react/solid';
import React from 'react';

export default function Card({ item, onChange }) {
  return (
    <div
      className="ml-10 border border-gray-300 rounded-md shadow-sm mb-2 px-2 py-2"
      style={Object.assign({})}
    >
      <div className="flex ">
        <ViewGridIcon className="text-current w-5" fill="gray" />
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={onChange}
          value={item.object_type}
          className="appearance-none block w-full  border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent focus:border-0 sm:text-sm"
        />
      </div>
    </div>
  );
}
