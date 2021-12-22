import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import NextImage from './NextImage';
import router from 'next/router';
import moment from 'moment';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { locale } from 'utils/locale';

export default function ModalCompleteItem({
  type,
  open,
  setOpen,
  journeyId,
  userProgress,
  state,
  quizRetakeable,
  onRetakeQuiz
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block width-520 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-8">
              <div className="flex items-center flex-col space-y-12">
                <div className="relative width-120 height-120">
                  {state === "retake" || state === "off_retake_limit" ?
                    <NextImage
                      src={'/Retake_Quiz.png'}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
                    :
                    <NextImage
                      src={'/Complete_Item.png'}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
                  }
                </div>
                <div className="mt-3 text-center w-full sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className={`${
                      state === 'retake' || state === 'off_retake_limit'
                        ? ' text-red-500'
                        : 'text-green-500'
                    } leading-6 med-24`}
                  >
                    {type !== 'Quiz' || !quizRetakeable
                      ? `${type} Completed!`
                      : state === 'retake' || state === 'off_retake_limit'
                      ? 'You have Failed.'
                      : 'You have passed.'}
                  </Dialog.Title>
                  <div className="mt-8 w-full">
                    {type !== 'Quiz' ? (
                      <p className="text-sm text-gray-500 max-w-lg"></p>
                    ) : (
                      <div className="flex gap-4 flex-col">
                        <div className="flex gap-8 mobile:flex-col justify-center mobile:items-center">
                          {/* <div className="width-200 mobile:w-full height-100 bg-yellow-50 flex flex-col space-y-2 items-center justify-center">
                              <p className="reg-20 text-gray-700">Date Completed</p>
                              <p className="med-24 text-yellow-500">{userProgress?.completionDate ? moment(userProgress?.completionDate).local().format('DD MMM YYYY') : "Not Set"}</p>
                            </div> */}

                          <div className="w-full mobile:w-full height-100 bg-yellow-50 flex flex-col space-y-2 items-center justify-center">
                            <p className="reg-20 text-gray-700">
                              Result Percentage
                            </p>
                            <p
                              className={`med-24 ${
                                state === 'retake' ||
                                state === 'off_retake_limit'
                                  ? ' text-red-500'
                                  : 'text-green-500'
                              }`}
                            >
                              {Math.round(userProgress?.scorePercentage)}%
                            </p>
                          </div>
                        </div>

                        {(state === 'retake' ||
                          state === 'off_retake_limit') && (
                          <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <InformationCircleIcon
                                  className="h-5 w-5 text-blue-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-left text-blue-800">
                                  {locale(
                                    'This quiz requires you to score 90% or above to be considered complete.'
                                  )}
                                  {state === 'retake' &&
                                    ' Please make another attempt.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-8">
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    className={`${state === "retake" ? "inline-flex": "hidden"} width-200 justify-center items-center px-6 py-3 border-2 border-base-600 shadow-sm text-base font-medium rounded-md text-base-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                    onClick={onRetakeQuiz}
                  >
                    Retake
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center items-center px-6 py-3 width-200 border border-transparent text-base font-medium rounded-6 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={() => router.push(`/journey/${journeyId}`)}
                  >
                    Back to Journey
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
