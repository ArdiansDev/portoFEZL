import { useSubmitResources } from 'hooks/resources/useResources';
import React, { useState } from 'react';
import NewWindow from 'react-new-window';
import { locale } from "utils/locale";

export const ResourceCard = ({ resource }) => {
  const [openResource, setOpenResource] = useState(null);
  const { mutate } = useSubmitResources()

  const viewResource = (resource) => {
    if(resource?.state === "in_progress"){
      mutate(resource?.id)
    } 
    setOpenResource(true)
  }
  return (
    <div className="flex max-width-412 flex-col p-6 w-full bg-white rounded-8 width-full height-293 shadow hover:shadow-lg">
      <div className="flex flex-col space-y-6 justify-between h-full">
        <div className="flex flex-col flex-gap space-y-4 mb-auto">
          <div className="flex flex-col space-y-2">
            <span className="self-start inline-flex items-center px-3 py-0.5 rounded-md text-sm font-medium bg-base-100 text-base-800">
              {resource.modality}
            </span>
            <p className="med-16 text-gray-800">{resource.name}</p>
            {/* <div className="flex flex-col space-y-0 5">
                <div className="flex space-x-1 5">
                <CalendarIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                />
                <p className="text-gray-400 reg-12">
                    {resource.date}
                </p>
                </div>
                <div className="flex space-x-1 5">
                <ClockIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                />
                <p className="text-gray-400 reg-12">
                    Duration {parseInt(resource.duration)} mins
                </p>
                </div>
            </div> */}
          </div>
          <p className="reg-14 text-gray-500 line-clamp-3">
            {resource.description}
          </p>
        </div>
        <p
          className="self-end reg-14 text-base-700 cursor-pointer hover:underline"
          onClick={() => viewResource(resource)}
        >
          {locale(resource?.state === "completed" ? "View Again" : "View Resource")}
        </p>
      </div>

      {openResource && (
        <NewWindow
          url={resource.url}
          features={{ width: 1044, height: 688 }}
          center="parent"
          onUnload={() => setOpenResource(false)}
        />
      )}
    </div>
  );
};
