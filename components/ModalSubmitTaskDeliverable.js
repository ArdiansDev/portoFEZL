import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InboxInIcon, PaperClipIcon, XIcon } from '@heroicons/react/outline'
import { locale } from "utils/locale";

export default function ModalSubmitTaskDeliverable({open, setOpen}) {
  const [attachments, setAttachments] = useState([]);
  const uploadFile = (e) => {
    let newFiles = JSON.parse(JSON.stringify(attachments));
    newFiles.push(e.target.files);
    setAttachments(...newFiles);
  }

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
            <div className="mobile:w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-10">
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
              <div className="mt-10 w-full">
                <div className="mt-3 text-center space-y-6 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg med-20 text-center leading-6 font-medium text-gray-900">
                  {locale("Submit Task Deliverable")}
                  </Dialog.Title>
                  <div>
                     <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                     {locale("Upload File")}
                    </label>
                    <div className="mt-1 sm:col-span-2">
                        <label className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 bg-gray-100 rounded-md cursor-pointer"  htmlFor="file-upload">
                        <div className="space-y-1 text-center flex flex-col">
                            <InboxInIcon className="h-12 w-12 text-base-600 self-center" />
                            <div className="flex text-sm text-gray-600">
                            <label
                                className="relative cursor-pointer rounded-md font-medium text-base-600 hover:text-base-500"
                            >
                                <span>{("Upload a file")}</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadFile} multiple/>
                            </label>
                            <p className="pl-1">{("or drag and drop")}</p>
                            </div>
                        </div>
                        </label>
                    </div>
                  </div>
                  {[...attachments].length > 0 && <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    {locale("Files")}
                    </label>
                    <ul role="list" className="border mt-1 border-gray-200 rounded-md divide-y divide-gray-200">
                        {[...attachments]?.map((attachment) => (
                        <li
                            key={attachment.name}
                            className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                            <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                  </div>
                }
                  <div className="sm:col-span-6">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    {locale("Comment")}
                    </label>
                    <div className="mt-1">
                        <textarea
                        id="about"
                        name="about"
                        rows={5}
                        className="shadow-sm focus:ring-base-500 focus:border-base-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                        placeholder="Submit a message to your facilitate to request for task approval."
                        />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-10 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-base-600 text-base font-medium text-white hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  {locale("Submit")}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  {locale("Cancel")}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}