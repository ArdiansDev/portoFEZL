import React from "react";
import { SearchIcon } from '@heroicons/react/solid'

export const SearchForm = () => {
  return (
    <form className="w-full min-w-min inline-flex relative justify-center rounded-md border border-gray-300 shadow-inner px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-base-500">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        className="w-full h-full ml-5 focus:outline-none "
        id="search"
        name="search"
        placeholder="Search"
      />
    </form>
  );
};
