  import { useAuth } from 'context/AuthContext';
  import React from 'react';
  import startCase from "lodash.startcase";
  import { usePermission } from 'hooks/configuration/usePermission';
  
  export default function Permission() {

    const { permission } = useAuth();
    const arrayPermission = Object.keys(permission).map((key) => [key, permission[key]]);

    const { mutate } = usePermission();
    return (
      <fieldset className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {arrayPermission.map((permission, permissionIdx) => (
            <div key={permissionIdx} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label htmlFor={`permission-${permission[0]}`} className="font-medium text-gray-700 select-none">
                  {startCase(permission[0])}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id={`permission-${permission[0]}`}
                  name={`permission-${permission[0]}`}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={permission[1]}
                  onClick={(e) => mutate({ [permission[0]] : e.target.checked})}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    )
  }