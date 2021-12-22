import TData from 'components/table/TData';
import THead from 'components/table/THead';
import React from 'react';

export default function Table({ thead, tbody, title }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {thead.map((thead) => (
                    <THead>{thead}</THead>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tbody.map((trow) => (
                  <tr key={trow.key}>
                    {trow.tdata.map((tdata) => (
                      <TData
                        data={tdata.data}
                        variant={tdata.variant}
                        action={tdata?.action}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {tbody.length === 0 && (
              <div className="justify-center items-center flex flex-col h-96">
                <p className="text-base text-gray-400 text-center capitalize">
                  No {title} Data
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
