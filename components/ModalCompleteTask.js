import NextImage from "components/NextImage";
import { CameraIcon, InboxIcon, QrcodeIcon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    isMobile
  } from "react-device-detect";
import { UserIcon } from "@heroicons/react/solid";

export default function ModalCompleteTask({open, setOpen, setSubmitTaskDeliverable, setUploadQRCode, setRequestTaskCompletion}){

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
              <p className="med-20 text-gray-700">Complete Task</p>
                
              <div className="space-y-2 5 flex flex-col w-full">  

                <div className="w-full px-4 py-3 bg-base-50" onClick={setSubmitTaskDeliverable} >
                  <div className="flex flex-col space-y-2.5 items-center cursor-pointer">
                    <InboxIcon className="h-12 w-12 text-base-600" />
                    <label className="reg-16 text-base-600">Submit Task Deliverable to Facilitator</label>
                  </div>
                </div>

                <div className="w-full px-4 py-3 bg-base-50" onClick={setUploadQRCode}>
                    <div className="flex flex-col space-y-2.5 items-center cursor-pointer">
                        {!isMobile && <QrcodeIcon className="h-12 w-12 text-base-600" />}
                        {isMobile && <CameraIcon className="h-12 w-12 text-base-600" />}
                        {!isMobile && <label className="reg-16 text-base-600">Upload Facilitator Task QR Code</label>}
                        {isMobile && <label className="reg-16 text-base-600"> Upload/Scan Facilitator Task QR Code</label>}
                    </div>
                </div>

                <div className="w-full px-4 py-3 bg-base-50" onClick={setRequestTaskCompletion}>
                    <div className="flex flex-col space-y-2.5 items-center cursor-pointer">
                        <UserIcon className="h-12 w-12 text-base-600" />
                        <label className="reg-16 text-base-600">Request for Task Completion</label>
                    </div>
                </div>
              </div>
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