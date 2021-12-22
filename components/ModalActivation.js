import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import NextImage from './NextImage'

export default function ModalActivation({type, open, setOpen, journeyId}) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={()=>{}}>
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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className="inline-block width-600 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-8">
              <div className="flex items-center flex-col space-y-12">
                <NextImage width="238x" height="67px" src={tenant?.imageLogoUrl} alt="" />
                <div className="mt-3 text-left w-full sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                    Verify with Employee ID or Email Address
                  </Dialog.Title>
                  <div className="my-6">
                        <form className="space-y-6 w-full">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Email
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            </div>
                        </div>
                       <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Employee ID
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                id="employee-id"
                                name="employee-id"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            </div>
                        </div>
                        </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-8">
              <div className="flex gap-4 justify-between">
                  <button
                    type="button"
                    className="width-200 height-42 inline-flex justify-center items-center border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={()=>setOpen(false)}
                  >
                    No, That's not me
                  </button>

                <button
                  type="button"
                  className="inline-flex height-42 justify-center items-center width-200 border border-transparent text-base font-medium rounded-6 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                >
                 Yes, That's me
                </button>

                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}