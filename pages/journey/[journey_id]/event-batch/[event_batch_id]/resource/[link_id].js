import { LinkIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewWindow from 'react-new-window';
import { useRouter } from 'next/router';
import { useMediaLink, useSubmitMediaLink } from 'hooks/mediaLink/useMediaLink';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from 'context/AuthContext';
import { locale } from 'utils/locale';

import {
  CheckCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid';

export default function Link() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['view_journey_resources'])
    return <div>You are not allowed to enter this page</div>;

  const { link_id, journey_id } = router.query;
  const { data: mediaLink } = useMediaLink({ event_id: link_id });

  const [linkData, setLinkData] = useState();
  const [openLink, setOpenLink] = useState();
  const [showNotif, setShowNotif] = useState(true);

  let isComplete = mediaLink?.state === 'completed';

  const scrape = async () => {
    const { data } = await axios(`/api/scrape?url=${mediaLink?.linkUrl}`);
    setLinkData(data);
  };

  useEffect(() => {
    if (mediaLink) {
      scrape();
    }
  }, [mediaLink]);

  const newWindowUnloaded = () => {
    setOpenLink(false);
  };

  const { mutate } = useSubmitMediaLink({ event_id: link_id });

  const primaryAction = () => {
    if (isComplete) {
      router.push(`/journey/${journey_id}`);
    } else {
      setOpenLink(true);
      mutate();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen space-y-7">
        {/* <div className="height-38 flex justify-between">
            <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
              <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="med-20 text-gray-900">Link</p>
            <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </div>
        </div> */}

        <div className="flex flex-col gap-3">
          {permission['view_resources_alert'] && showNotif && (
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon
                    className="h-5 w-5 text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    {locale(
                      'Earn an additional 50 coins by fully completing this Resource on LinkedIn Learning. Additional Coins earned will be awarded at the end of each week.'
                    )}
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex bg-blue-50 rounded-md p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
                      onClick={() => setShowNotif(false)}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full p-5 bg-white rounded-12 shadow">
            <div className="px-4 py-5 flex flex-row gap-10 w-full">
              <div className="flex flex-col justify-between min-height-350 w-full sm:gap-0 gap-2">
                <div className="flex flex-col gap-5">
                  <p className="med-20 text-base-600">
                    {mediaLink?.name || <Skeleton count={2} />}
                  </p>
                  <p className="reg-16 text-gray-500">
                    {mediaLink?.description || <Skeleton count={5} />}
                  </p>
                </div>

                <div className="md:self-end mt-6 self-center mobile:w-full flex gap-3">
                  <button
                    type="button"
                    onClick={primaryAction}
                    className="inline-flex justify-center items-center py-2.5 width-200 mobile:w-full border border-transparent med-16 rounded-8 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:bg-gray-100 disabled:text-gray-300"
                  >
                    {isComplete
                      ? locale('Back to Journey')
                      : locale('Continue')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <p className="reg-20 text-gray-600">Resource</p>
          <div className="p-4 space-x-4 bg-white rounded-12 shadow items-center flex gap-2 sm:gap-0 justify-between flex-col sm:flex-row">
            <div className="space-y-2 flex flex-col">
              <div className="flex space-x-2.5">
                <LinkIcon className="flex-shrink-0 lg:block hidden w-5 mt-0.5 h-5 ml-0.5 text-gray-600" />
                <div className="flex flex-col space-y-2">
                  <p
                    className="med-16 text-blue-600 cursor-pointer"
                    onClick={() => {
                      setOpenLink(true);
                      mutate();
                    }}
                  >
                    {linkData?.title}
                  </p>
                  <p
                    className="reg-16 text-green-600 cursor-pointer break-all whitespace-normal"
                    onClick={() => {
                      setOpenLink(true);
                      mutate();
                    }}
                  >
                    {linkData?.url || <Skeleton />}
                  </p>
                  <p className="reg-16 text-gray-600">
                    {linkData?.description}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="md:justify-end self-center min-width-140 flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
              onClick={() => {
                setOpenLink(true);
                mutate();
              }}
            >
              Open Resource
              <ExternalLinkIcon
                className="ml-3 -mr-1 h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {openLink && (
          <NewWindow
            url={mediaLink?.linkUrl}
            features={{ width: 1044, height: 688 }}
            center={'parent'}
            onUnload={() => newWindowUnloaded()}
          />
        )}
      </div>
    </div>
  );
}
