/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import {
  useSubmitBulkLink,
  useGetPresign,
  useSubmitBulkReports,
} from 'hooks/link/useLink';
import axios from 'axios';
import { BookOpenIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';

export default function ModalUploadFile({
  open,
  setOpen,
  refetch,
  setUploadNotif,
  setStatusAndRemarks,
  setPendingUpload,
}) {
  const [data, setData] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const { mutate: uploadReports } = useSubmitBulkReports({
    options: {
      onSettled: (data) => {
        setPendingUpload(false);
        setUploadNotif(true);
        setTimeout(() => {
          setUploadNotif(false);
        }, 2000);
      },
    },
  });

  const { mutate: mutateBulkResources } = useSubmitBulkLink({
    options: {
      onSettled: (data) => {
        refetch();
        reportUploaded(data);
      },
    },
  });

  const filename = selectedFile?.name;
  const { data: presignData, refetch: presignRefetch } = useGetPresign({
    query: { directory: 'files', extension: 'csv', filename: filename },
    options: { enabled: !!filename },
  });

  const cancelButtonRef = useRef(null);

  const parseFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        let payload;

        payload = results.data.map((data) => ({
          title: data['Link Title'],
          description: data['Description'],
          url: data['Link'],
          external_id: data['External Item ID'],
          category: data['Category'],
          sub_categories: data['Sub Category'],
          source: data['Source'],
          reward_gem: parseInt(data['Gems']),
          reward_coin: parseInt(data['Coins']),
          reward_score: parseInt(data['Score']),
        }));

        setData(payload);
      },
    });
  };

  const SubmitFile = () => {
    setPendingUpload(true);
    let formData = new FormData();
    formData.append('file', selectedFile);
    const uploadUrl = presignData?.data?.uploadUrl;
    axios
      .put(uploadUrl, formData, {
        headers: {
          'Content-Type': selectedFile.type,
        },
      })
      .then(() => {
        setSelectedFile();
        mutateBulkResources({ links: data });
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  useEffect(() => {
    if (filename) {
      presignRefetch();
    }
  }, [filename]);

  const reportUploaded = (bulkData) => {
    let status = '';

    if (
      bulkData &&
      bulkData?.data?.totalCreated > bulkData?.data?.totalFailed
    ) {
      status = 'success';
    } else {
      status = 'unsuccessful';
    }

    let remarks = '';
    if (status === 'success') {
      remarks = `${bulkData?.data?.totalCreated} record(s) uploaded`;
    } else {
      if (bulkData?.data?.totalFailed) {
        remarks = `${bulkData?.data?.totalFailed} record(s) failed`;
      } else {
        remarks = 'Something went wrong';
      }
    }

    let reportsPayload = {
      filename: presignData?.data?.filename,
      fileUrl: presignData?.data?.downloadUrl,
      context: 'link_bulk_create',
      remarks,
      status: status,
    };

    uploadReports(reportsPayload);
    setStatusAndRemarks({
      status,
      remarks,
    });
  };

  const templateResource =
    'https://absolute-mvp-prod.s3.amazonaws.com/upload-templates/Resources_Bulk_Upload_Template.csv';
  const templateResourceCompletion =
    'https://absolute-mvp-prod.s3.amazonaws.com/upload-templates/Resource_Completion_Bulk_Upload_Template.csv';

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
                    className="text-lg leading-7 font-medium text-gray-900"
                  >
                    Bulk Upload Links
                  </Dialog.Title>
                  <div className="w-full border-b border-gray-300 height-20 mb-4" />
                  <div className="">
                    <p className="text-base mb-1 leading-6 font-medium text-black">
                      Instructions
                    </p>
                    <ul className="mt-5 ml-3 space-y-2 list-decimal text-xs leading-4 font-normal text-gray-900">
                      <li>
                        Log-in to{' '}
                        <span className="text-base-600">
                          <a
                            href={
                              'https://performancemanager10.successfactors.com/login?company=UOB'
                            }
                            className="hover:underline text-base-600"
                          >
                            https://performancemanager10.successfactors.com/login?company=UOB
                          </a>
                        </span>
                      </li>
                      <li>
                        Download the template for Link Bulk Upload here{' '}
                        <span>
                          <a
                            href={templateResource}
                            className="hover:underline text-base-600"
                          >
                            Links_Bulk_Upload_Tempate.csv
                          </a>
                        </span>
                      </li>
                      <li>
                        Input your data into template that you’ve downloaded
                      </li>
                      <li>Click or drag your file to the upload area</li>
                      <li>Click Submit to upload the CSV File</li>
                      <li>
                        Notification will appear when the file uploaded. Status
                        can be ‘Successful’ or ‘Unsuccessful’
                      </li>
                    </ul>

                    {!selectedFile ? (
                      <div className="mt-5 sm:col-span-2">
                        <div
                          {...getRootProps()}
                          className={`height-128 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 ${
                            isDragAccept && 'border-green-300'
                          } ${
                            isDragReject && 'border-red-300'
                          } border-dashed rounded-md`}
                        >
                          <div className="space-y-1 text-center flex flex-col justify-center">
                            <DocumentAddIcon className="mx-auto h-10 w-10 text-gray-400" />

                            <div className="flex text-sm text-gray-600">
                              {!isDragActive ? (
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="relative cursor-pointer bg-white rounded-md font-medium text-base-600 hover:text-base-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-base-500">
                                      <span>Upload a file</span>
                                      <input {...getInputProps()} />
                                    </p>

                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    CSV up to 10MB
                                  </p>
                                </div>
                              ) : (
                                <p>Drop the files here ...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 height-42 px-4 py-3 border border-gray-500 rounded-6 w-full flex items-center">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex gap-3 items-center">
                            <BookOpenIcon className="h-5 w-5 text-gray-600" />
                            <p className="text-xs leading-4 font-normal text-gray-600 max-width-470 truncate overflow-ellipsis">
                              {filename}
                            </p>
                          </div>
                          <XCircleIcon
                            className="h-5 w-5 text-gray-600 cursor-pointer"
                            onClick={() => setSelectedFile()}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-139 height-38 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-base-600 text-base font-medium text-white hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    setOpen(false);
                    SubmitFile();
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-139 height-38 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
