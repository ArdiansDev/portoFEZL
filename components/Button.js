import React from "react";

export const Button = ({ title }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-gray-8 bg-orange-6 hover:bg-orange-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-5"
    >
      {title}
    </button>
  );
};
