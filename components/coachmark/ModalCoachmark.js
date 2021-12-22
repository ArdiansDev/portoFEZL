/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import NextImage from 'components/NextImage'

export default function ModalCoachmark() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  let content = [
    {
        image: "/Intro_1.png",
        title: "Welcome to UOB Learning!",
        description: "As a first time user with us, take a tour or jump right in!"
    },
    {
        image: "/Intro_2.png",
        title: "Challenges",
        description: "Earn Score & Coins by completing Invitational, Journey & Weekly Challenges."
    },
    {
        image: "/Intro_3.png",
        title: "Journeys",
        description: "Complete your assigned Learning Journeys by selecting a specific Journey."
    },
    {
        image: "/Intro_4.png",
        title: "Profile",
        description: "View your Learning Leaderboard Position & Achievement Badges by selecting 'Profile'."
    },
    {
        image: "/Intro_5.png",
        title: "Resources",
        description: "Complete additional Learning Content by selecting your a specific Resource."
    }
  ]

  const [currentContentIdx, setCurrentContentIdx] = useState(0);
  const isFinish = currentContentIdx === content.length -1

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block mobile:w-full sm:width-600 sm:height-500 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
              <div className="hidden sm:flex justify-end top-0 right-0 sm:pb-14 pb-6">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="height-264">
                <div className="w-full sm:height-186 height-147 py-5 relative mx-auto flex items-center justify-center">
                    <NextImage layout="fill" src={content[currentContentIdx].image} objectFit="contain" />
                </div>
                <div className="text-center sm:mt-3">
                  <Dialog.Title as="h3" className="med-20 sm:med-24 text-gray-900">
                    {content[currentContentIdx].title}
                  </Dialog.Title>
                  <div className="mt-2.5">
                    <p className="reg-14 sm:reg-16 text-gray-500">
                    {content[currentContentIdx].description}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`flex flex-row-reverse ${isFinish ? "justify-center" : "justify-between"} sm:pt-14 pt-6`}>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm width-100 py-2 bg-base-600 text-base font-medium text-white hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => { isFinish ? setOpen(false) : setCurrentContentIdx(currentContentIdx+1)}}
                >
                  {isFinish ? "Finish" : "Next"}
                </button>
                <button
                  type="button"
                  className={`${isFinish ? "hidden" : "inline-flex"} width-100 items-center justify-center rounded-md bg-white med-16 text-base-700 hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 sm:mt-0`}
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Skip
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
