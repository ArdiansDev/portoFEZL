import NextImage from "components/NextImage";
import { XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function ModalRegister({open, setOpen, register, type}){

    const [date, setDate] = useState()
    const [location, setLocation] = useState()

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" auto-reopen="true" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
             <div className="width-489 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

        <div className="bg-white rounded-8 py-8 px-6">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col items-center space-y-6 w-full">
              <NextImage
                width={192}
                height={142}
                src={"/Register_Image.png"}
                alt=""
                layout="fixed"
              />
              <p className="med-20 text-gray-700">Sample Webinar Title</p>
              <form className="space-y-4 w-full">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                 Date and Time
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="date"
                    name="date"
                    autoComplete="date"
                    className="max-w-lg block focus:ring-base-500 focus:border-base-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setDate(e.target.value)}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
              {type !== "webinar" &&<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Location
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="location"
                    name="location"
                    autoComplete="location"
                    className="max-w-lg block focus:ring-base-500 focus:border-base-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>}
              </form>
              <button
                type="button"
                className="width-124 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                onClick={(e)=>{ e.preventDefault(); register({date, location})}}
              >
                Register
              </button>
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