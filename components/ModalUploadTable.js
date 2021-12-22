/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Table from './admin/Table';
import Pagination from 'components/Completion/Pagination';
import { SearchForm } from 'components/Completion/SearchForm';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Filter from 'components/Filter/Filter';
export default function ModalUploadFile({
  open,
  setOpen,
  tbody,
  data,
  onSearch,
  pagination,
  onRefresh,
  updateFormData,
  formData,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-10">
              <div className="sm:flex sm:items-start">
                <div className="mt-2 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-7 reg-14 flex justify-between text-blue-500 bg-blue-50 p-4 rounded-xl"
                  >
                    <p className="flex">
                      <InformationCircleIcon className="width-16" />
                      You can add multiple existing quizzes or create a new one.
                    </p>
                    <button>Create New Quiz →</button>
                  </Dialog.Title>
                  <div className="w-full border-b border-gray-300 height-20 mb-4" />
                  <div className="">
                    <SearchForm
                      onSearch={onSearch}
                      placeholder={'Search by Title'}
                    />
                    <Filter
                      filterData={formData}
                      changeFilterData={updateFormData}
                      resetFilter={onRefresh}
                    />
                    <Table
                      thead={['TITLE', 'SCORE', 'COINS', 'GEMS', 'ACTION']}
                      tbody={tbody}
                    />
                    <div className="mt-7">
                      {data?.pagination.totalPages > 1 ? (
                        <Pagination pagination={pagination} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex justify-end w-full gap-2">
                      <button
                        className="border border-blue-500 rounded-lg p-2 width-111 reg-14 bg-white text-blue-500"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border border-blue-500 rounded-lg p-2 width-131 reg-14 bg-blue-500 text-white"
                        onClick={() => setOpen(false)}
                      >
                        Save
                      </button>
                    </div>
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
