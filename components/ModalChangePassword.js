import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import NextImage from './NextImage';
import { XIcon } from '@heroicons/react/solid';
import { useChangePassword } from 'hooks/auth/useChangePassword';

export default function ModalChangePassword({
  open,
  setOpen,
  setModalSuccess,
}) {
  const cancelButtonRef = useRef(null);

  const { isLoading, isSuccess, error, mutate } = useChangePassword();
  const logout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { newPasswordConfirmation, oldPassword, newPassword } =
      event.target.elements;
    let data = {
      membership: {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        newPasswordConfirmation: newPasswordConfirmation.value,
      },
    };
    mutate(data);
    // setTimeout(() => setModalSuccess(true), 1000);
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalSuccess(true);
      setOpenSuccessResetPassword(true);
      logout();
    } else if (error) {
      alert(
        'Old password is invalid or new password has been used previously.'
      );
    }
  }, [isLoading]);

  const [openSuccessResetPassword, setOpenSuccessResetPassword] =
    useState(false);

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
            <div className="inline-block width-500 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-8">
              <div className="flex items-center flex-col space-y-6">
                {/* <NextImage width="238x" height="67px" src={"/UOB_Logo.png"} alt="" /> */}
                <div className="hidden sm:block self-end top-0 right-0 pt-2 pr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="text-left mobile:w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center leading-6 font-medium text-gray-900"
                  >
                    Verify your old password and add your new password
                  </Dialog.Title>
                  <div className="my-6">
                    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Old Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            id="old-password"
                            name="oldPassword"
                            type="password"
                            autoComplete="password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          New Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Confirm New Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            id="new-password-confirmation"
                            name="newPasswordConfirmation"
                            type="password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-8">
                        <div className="flex gap-4 justify-between">
                          <button
                            type="button"
                            className="width-200 height-42 inline-flex justify-center items-center border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="inline-flex height-42 justify-center items-center width-200 border border-transparent text-base font-medium rounded-6 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
