import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { CheckCircleIcon } from '@heroicons/react/outline';
import JourneyListCard from './JourneyListCard';
import router from 'next/router';

export default function JourneySectionCard({ title, item, userProgress, journey_id }) {
  const [show, setShow] = useState(false);
  let check = item?.sectionItems;
  let countfiltered = check.filter(function (element) {
    return element?.state == 'completed';
  }).length;

  return (
    <div>
      <div
        className={
          (show ? ' rounded-t-lg ' : ' rounded-lg ') +
          ' p-5 bg-secondary shadow  flex justify-between items-center hover:shadow-lg '
        }
      >
        <div>
          <h1 className="reg-16 sm:reg-20 text-white">{title}</h1>
          <p className="reg-12 text-white flex items-center">
            {countfiltered ?? 0} of {item.totalItem} Completed Items{' '}
            <CheckCircleIcon className="width-13  ml-2" />
          </p>
        </div>
        <button onClick={() => setShow(!show)}>
          {show ? (
            <ChevronDownIcon className="height-40 text-white" />
          ) : (
            <ChevronRightIcon className="height-40 text-white" />
          )}
        </button>
      </div>
      {show ? (
        <div className="bg-gray-200 p-5 gap-2 flex flex-col rounded-b-lg">
          {(item.sectionItems &&
            item.sectionItems?.map((item) => {
              if (
                item?.itemType?.toLowerCase() !== 'event' &&
                item?.itemType?.toLowerCase() !== 'workshop' &&
                item?.itemType?.toLowerCase() !== 'webinar' &&
                item?.itemType?.toLowerCase() !== 'task'
              ) {
                return (
                  <div>
                    <JourneyListCard
                      type={item.itemType}
                      title={item.title}
                      remainingAttempts={item.remainingAttempts}
                      completed={item.state === 'completed'}
                      retake={item?.state === 'retake'}
                      offRetakeLimit={item?.state === 'off_retake_limit'}
                      key={item.id}
                      onClick={() => {
                        let url = `/journey/${journey_id}/event-batch/${
                          item.eventBatchId
                        }/${item.itemType.toLowerCase()}/${item.id}`;
                        if (item.itemType.toLowerCase() === 'survey') {
                          url += `/welcome`;
                        }

                        if (item.itemType.toLowerCase() === 'quiz') {
                          url += `/question/${item.id}`;
                        }
                        router.push(url);
                      }}
                    />
                  </div>
                );
              }
            })) || (
            <React.Fragment>
              <Skeleton count={3} /> <Skeleton count={3} />{' '}
              <Skeleton count={3} /> <Skeleton count={3} />{' '}
              <Skeleton count={3} /> <Skeleton count={3} />{' '}
              <Skeleton count={3} /> <Skeleton count={3} />
            </React.Fragment>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
