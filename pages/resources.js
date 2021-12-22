import React, { useState } from 'react';
import { useResources, useSubmitResources } from 'hooks/resources/useResources';
import Skeleton from 'react-loading-skeleton';
import NewWindow from 'react-new-window';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export default function Resources() {
  const { data: resources } = useResources();
  const [openResource, setOpenResource] = useState(null);
  const [currentResource, setCurrentResource] = useState();
  const { mutate } = useSubmitResources()

  const { permission } = useAuth();
  if (!permission['view_resources'])
    return <div>You are not allowed to enter this page</div>;

  const viewResource = (resource) => {
    if(resource?.state === "in_progress"){
      mutate(resource?.id)
    } 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="pb-16 flex flex-col space-y-12 pt-8">
        <div className="flex flex-col space-y-6 ">
          <div className="flex flex-col space-y-3">
            <p className="med-24 text-gray-900">
              {locale('Recommended for you')}
            </p>
            <div className="grid grid-cols-auto-fit gap-5">
              {(resources &&
                resources?.map((resource) => (
                  <div className="flex max-width-412 flex-col p-6 w-full bg-white rounded-8 width-full height-293 shadow hover:shadow-lg" key={resource.id}>
                    <div className="flex flex-col space-y-6 justify-between h-full">
                      <div className="flex flex-col flex-gap space-y-4 mb-auto">
                        <div className="flex flex-col space-y-2">
                          <span className="self-start inline-flex items-center px-3 py-0.5 rounded-md text-sm font-medium bg-base-100 text-base-800">
                            {resource.modality}
                          </span>
                          <p className="med-16 text-gray-800">
                            {resource.name}
                          </p>
                          {/* <div className="flex flex-col space-y-0 5"> */}
                          {/* <div className="flex space-x-1 5">
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
                              {locale("Duration")} {parseInt(resource.duration)} {locale("mins")}
                            </p>
                          </div>
                        </div> */}
                        </div>
                        <p className="reg-12 text-gray-700 line-clamp-3">
                          {resource.description}
                        </p>
                      </div>
                      <p
                        className="self-end reg-14 text-base-700 cursor-pointer hover:underline"
                        onClick={() => {
                          setOpenResource(true);
                          setCurrentResource(resource);
                          viewResource(resource)
                        }}
                      >
                        {locale(resource?.state === "completed" ? "View Again" : "View Resource")}
                      </p>
                    </div>
                  </div>
                ))) || (
                <React.Fragment>
                  {' '}
                  <Skeleton count={8} /> <Skeleton count={8} />{' '}
                  <Skeleton count={8} /> <Skeleton count={8} />{' '}
                  <Skeleton count={8} /> <Skeleton count={8} />{' '}
                </React.Fragment>
              )}

              {openResource && (
                <NewWindow
                  url={currentResource.url}
                  features={{ width: 1044, height: 688 }}
                  center="parent"
                  onUnload={() => setOpenResource(false)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
