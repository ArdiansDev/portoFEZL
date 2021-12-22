import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ChallengeCardMini from "components/ChallengeCardMini";
import { useChallenges } from 'hooks/challenges/useChallenges';
import { XIcon } from '@heroicons/react/outline';
import Skeleton from 'react-loading-skeleton';

export default function ModalChallenge({open, setOpen}) {
  const { data} = useChallenges();
  const dataSliced = data?.data;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" auto-reopen="true" className="fixed z-10 inset-0" onClose={setOpen}>
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
          <span className="inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                <div className="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={() => setOpen(false)}
                    >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Challenges
                  </Dialog.Title>
                  <div className="mt-2 pr-1 overflow-y-auto max-height-520">
                    {dataSliced?.length > 0 ?
                        dataSliced?.map((data) => (
                            <ChallengeCardMini
                            Percentage="30%"
                            Title={data.title}
                            Coins="30 "
                            CompletedItems={1}
                            TotalItems={3}
                            />
                        ))
                    : <Skeleton count={5} /> }
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}