import NextImage from "components/NextImage";
import {
  BookOpenIcon,
  CloudDownloadIcon,
  DeviceMobileIcon,
  DocumentIcon,
  DocumentTextIcon,
  FilmIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import {
  CheckCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { useState } from "react";
import Pagination from "components/Pagination";
import ReactPlayer from "react-player/lazy";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ModalSubmitTaskDeliverable from "components/ModalSubmitTaskDeliverable";
import { DateTime } from "luxon";
import ModalCompleteTask from "components/ModalCompleteTask";
import ModalCompleteActivity from 'components/ModalCompleteActivity';
import ModalRequestTaskForCompletion from "components/ModalRequestTaskCompletion";
import { useActivity } from "hooks/activity/useActivity";
import { useRouter } from "next/router";
import ModalCompleteItem from "components/ModalCompleteItem";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

export default function Task() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if(!permission["view_task"]) return <div>You are not allowed to enter this page</div>

  const { task_id } = router.query;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTimeout(() => {
      setShowPdf(true);
    }, 1000);
  }

  const [expand, setExpand] = useState(false);
  const [expandVideo, setExpandVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [expandImage, setExpandImage] = useState(false);
  const [showImage, setShowImage] = useState(false);

  function download(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.setAttribute("target", "_blank");
    a.click();
  }

  let approved = true;

  let approvalStatus = "not-yet";

  const [openCompleteTask, setOpenCompleteTask] = useState();
  const [submitTaskDeliverable, setSubmitTaskDeliverable] = useState();
  const [uploadQRCode, setUploadQRCode] = useState();
  const [requestTaskCompletion, setRequestTaskCompletion] = useState();
  const [openConfirmationTask, setOpenConfirmationTask] = useState();
  const [showApproveNotif, setShowApproveNotif] = useState(true);

  const { data:task } = useActivity({activity_id: task_id})

  let completed = false;

  return (
    <div className="min-h-screen pb-7">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen space-y-7">
        {/* <div className="height-38 flex justify-between">
          <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
          </div>
          <p className="med-20 text-gray-900">Task</p>
          <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div> */}

      {showApproveNotif && (
        <>
        {approvalStatus === "approve" && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {locale("Your Task has been approved.")}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  >
                    <span className="sr-only">{locale("Dismiss")}</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {approvalStatus === "rejected" && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {locale("Your Task has been Rejected. Please check your Task Deliverable.")}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    <span className="sr-only">{locale("Dismiss")}</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
      )}

        <div className="w-full p-5 bg-white rounded-12 shadow">
        <div className="px-4 py-5 flex sm:flex-row flex-col  gap-10">
          <div className="max-width-350 min-width-200 max-height-350 min-height-200 relative">
              <NextImage
                width={350}
                height={350}
                src={task?.imageUrl}
                alt=""
                layout="fill"
              />
            </div>
            <div className="flex flex-col justify-between w-full sm:gap-0 gap-2">
              <div className="flex flex-col gap-5">
                <p className="med-20 text-base-600">{task?.name}</p>
                <pre className="reg-16 text-gray-500 break-words whitespace-pre-line">
                  {task?.description}
                </pre>
              </div>
              <div className="md:self-end self-center flex gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center items-center py-2.5 width-200 border border-transparent med-16 rounded-8 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => setOpenCompleteTask(true)}
                >
                  {locale("Mark as Completed")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="reg-20 text-gray-600">{locale("Media")}</p>
          <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between flex-wrap items-center sm:flex-row flex-col sm:gap-0 gap-2 mobile:w-full">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <DocumentTextIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">
                      Document_for_New_Hiring.PDF
                    </p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start  mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() =>
                    download(
                      "https://absolute-mvp-staging.s3.amazonaws.com/sample.pdf",
                      "sample.pdf"
                    )
                  }
                >
                  Download
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className={`${
                    expand ? "bg-base-600 text-white" : "bg-white text-gray-700"
                  }  inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                  onClick={() => {
                    setExpand(expand ? false : true);
                    setShowPdf(false);
                  }}
                >
                  View
                  <BookOpenIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {expand && (
                <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="w-full flex justify-center">
                    <TransformWrapper>
                      <TransformComponent>
                        <Document
                          className={`${
                            showPdf ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-1000 ease-in-out`}
                          file="https://absolute-mvp-staging.s3.amazonaws.com/sample.pdf"
                          onLoadSuccess={onDocumentLoadSuccess}
                          renderMode="svg"
                          height={"800px"}
                        >
                          <Page pageNumber={pageNumber} />
                        </Document>
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
            {expand && (
              <Pagination
                setPageNumber={setPageNumber}
                numPages={numPages}
                pageNumber={pageNumber}
              />
            )}
          </div>

          <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <FilmIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">Introduction.mp4</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() =>
                    download(
                      "https://absolute-mvp-staging.s3.amazonaws.com/videoplayback.mp4",
                      "videoplayback.mp4"
                    )
                  }
                >
                  Download
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                    if (expandVideo) {
                      setShowVideo(false);
                    } else {
                      setTimeout(() => setShowVideo(true), 1000);
                    }
                    setExpandVideo(expandVideo ? false : true);
                  }}
                >
                  View
                  <BookOpenIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {expandVideo && (
                <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div
                    className={`${
                      showVideo ? "opacity-100" : "opacity-0"
                    } w-full  p-4 pt-8 transition-opacity duration-1000 ease-in-out`}
                  >
                    <ReactPlayer
                      className={` `}
                      width={"100%"}
                      height={"100%"}
                      url="https://absolute-mvp-staging.s3.amazonaws.com/videoplayback.mp4"
                      controls={true}
                    />
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <DeviceMobileIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">Introduction.jpg</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() =>
                    download(
                      "https://absolute-mvp-staging.s3.amazonaws.com/videoplayback.mp4",
                      "videoplayback.mp4"
                    )
                  }
                >
                  Download
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                    if (expandImage) {
                      setShowImage(false);
                    } else {
                      setTimeout(() => setShowImage(true), 1000);
                    }
                    setExpandImage(expandImage ? false : true);
                  }}
                >
                  View
                  <BookOpenIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {expandImage && (
                <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div
                    className={`${
                      showImage ? "opacity-100" : "opacity-0"
                    } w-full relative  p-4 pt-8 transition-opacity duration-1000 ease-in-out`}
                  >
                    <NextImage
                      src={
                        "https://images.unsplash.com/photo-1629648530797-ea135d60d534?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
                      }
                      alt=""
                      height={900}
                      width={1600}
                      objectFit={"contain"}
                      layout="responsive"
                    />
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1">
                  <DocumentIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16">Introduction.docs</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() =>
                    download(
                      "https://absolute-mvp-staging.s3.amazonaws.com/videoplayback.mp4",
                      "videoplayback.mp4"
                    )
                  }
                >
                  Download
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {(approvalStatus === "approve" ||
          approvalStatus === "rejected" ||
          approvalStatus === "pending") && (
          <div className="flex flex-col space-y-3">
            <p className="reg-20 text-gray-600">Task Approval Status</p>

            {approvalStatus === "pending" && (
              <div className="p-4 bg-white rounded-12 shadow flex justify-between items-center">
                <div className="space-y-2 flex flex-col">
                  <div className="flex space-x-2.5">
                    <ExclamationCircleIcon className="w-6 mt-0.5 h-6 text-yellow-600" />
                    <div className="flex flex-col space-y-2">
                      <p className="med-20 text-yellow-600">
                        You have submit the deliverables
                      </p>
                      <p className="text-gray-500 reg-16">
                        {DateTime.local().toLocaleString(
                          DateTime.DATETIME_FULL
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 self-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                    Pending Approval
                  </span>
                </div>
              </div>
            )}

            {approvalStatus === "approve" && (
              <div className="p-4 bg-white rounded-12 shadow flex justify-between items-center">
                <div className="space-y-2 flex flex-col">
                  <div className="flex space-x-2.5">
                    <ExclamationCircleIcon className="w-6 mt-0.5 h-6 text-green-600" />
                    <div className="flex flex-col space-y-2">
                      <p className="med-20 text-green-600">
                        You have submit the deliverables
                      </p>
                      <p className="text-gray-500 reg-16">
                        {DateTime.local().toLocaleString(
                          DateTime.DATETIME_FULL
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 self-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                </div>
              </div>
            )}

            {approvalStatus === "rejected" && (
              <div className="p-4 bg-white rounded-12 shadow flex justify-between items-center">
                <div className="space-y-2 flex flex-col">
                  <div className="flex space-x-2.5">
                    <ExclamationCircleIcon className="w-6 mt-0.5 h-6 text-red-600" />
                    <div className="flex flex-col space-y-2">
                      <p className="med-20 text-red-600">
                        You have submit the deliverables
                      </p>
                      <p className="text-gray-500 reg-16">
                        {DateTime.local().toLocaleString(
                          DateTime.DATETIME_FULL
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 self-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                    Rejected
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {openCompleteTask && (
        <ModalCompleteTask
          open={openCompleteTask}
          setOpen={setOpenCompleteTask}
          setSubmitTaskDeliverable={() => {
            setOpenCompleteTask(false);
            setTimeout(() => {
              setSubmitTaskDeliverable(true);
            }, 0);
          }}
          setUploadQRCode={() => {
            setOpenCompleteTask(false);
            setTimeout(() => {
              setUploadQRCode(true);
            }, 0);
          }}
          setRequestTaskCompletion={() => {
            setOpenCompleteTask(false);
            setTimeout(() => {
              setRequestTaskCompletion(true);
            }, 0);
          }}
        />
      )}

      {submitTaskDeliverable && <ModalSubmitTaskDeliverable open={submitTaskDeliverable} setOpen={setSubmitTaskDeliverable}/>}
      {requestTaskCompletion && <ModalRequestTaskForCompletion open={requestTaskCompletion} setOpen={setRequestTaskCompletion}/>}
      {uploadQRCode && (
        <ModalCompleteActivity open={uploadQRCode} setOpen={setUploadQRCode} type={"task"} />
      )}
      {openConfirmationTask && (
        <ModalConfirmationTask
          open={openConfirmationTask}
          setOpen={setOpenConfirmationTask}
        />
      )}

      <ModalCompleteItem open={completed} setOpen={()=>{}} type={"Task"}/>
    </div>
  );
}
