import NextImage from "components/NextImage";
import {
  BookOpenIcon,
  CloudDownloadIcon,
  DeviceMobileIcon,
  DocumentIcon,
  DocumentTextIcon,
  FilmIcon,
} from "@heroicons/react/outline";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import { useState } from "react";
import Pagination from "components/Pagination";
import ReactPlayer from "react-player/lazy";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useMediaLink, useSubmitMediaLink } from "hooks/mediaLink/useMediaLink";
import Skeleton from "react-loading-skeleton";
import usePagination from '@lucasmogari/react-pagination';
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

export default function Media() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if(!permission["view_media"]) return <div>You are not allowed to enter this page</div>

  const { media_id, journey_id } = router.query;
  const {data: mediaLink, isLoading} = useMediaLink({event_id: media_id});

  const [expand, setExpand] = useState(false);
  const [expandVideo, setExpandVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [expandImage, setExpandImage] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [totalItems, setTotalItems] = useState(21);
  
  const pagination = usePagination({
    page: 1,
    totalItems,
    itemsPerPage: 5,
    maxPageItems: 7,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  let { attachment } = mediaLink || {};

  function onDocumentLoadSuccess({ numPages }) {
    setTotalItems(numPages);
    setTimeout(() => {
      setShowPdf(true);
    }, 1000);
  }

  function download(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.setAttribute("target", "_blank");
    a.click();
  }
  
  const { mutate } = useSubmitMediaLink({ event_id:media_id });


  return (
    <div className="min-h-screen">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen space-y-7">
        {/* <div className="height-38 flex justify-between">
            <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
              <ArrowLeftIcon className="h-5 w-5 text-gray-400 " />
            </div>
            <p className="med-20 text-gray-900">Media</p>
            <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            </div>
        </div> */}

        <div className="w-full p-5 bg-white rounded-12 shadow">
          <div className="px-4 py-5 flex flex-row gap-10 w-full">
            <div className="flex flex-col justify-between min-height-350 w-full">
              <div className="flex flex-col gap-5">
                <p className="med-20 text-base-600">{mediaLink?.name || <Skeleton count={2}/>}</p>
                <p className="reg-16 text-gray-500">
                  {mediaLink?.description || <Skeleton count={5}/>}
                </p>
              </div>
              
              <div className="md:self-end self-center flex gap-3">
                <button
                  type="button"
                  onClick={()=>router.push(`/journey/${journey_id}`)}
                  className="inline-flex justify-center items-center py-2.5 width-200 border border-transparent med-16 rounded-8 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:bg-gray-100 disabled:text-gray-300"
                >
                  {locale("Back to Journey")}
                </button>
              </div>

            </div>
          </div>
        </div>

        {attachment && <div className="flex flex-col space-y-4">
          <p className="reg-20 text-gray-600">Media</p>
          
          {attachment.fileType.includes("pdf") && <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between flex-wrap items-center sm:flex-row flex-col sm:gap-0 gap-2 mobile:w-full">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <DocumentTextIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">
                      {attachment.filename}
                    </p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.fromISO(mediaLink.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start  mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                      download(
                        attachment.url,
                        attachment.filename
                      );
                      mutate()
                    }
                  }
                >
                  {locale("Download")}
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
                    mutate()
                  }}
                >
                  {locale("View")}
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
                  <div className="w-full pt-6 pb-2 flex justify-center h-full">
                    <TransformWrapper>
                      <TransformComponent>
                        <Document
                          className={`${
                            showPdf ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-1000 ease-in-out`}
                          file={attachment.url}
                          onLoadSuccess={onDocumentLoadSuccess}
                          renderMode="svg"
                          height={"800px"}
                        >
                          <Page pageNumber={page} />
                        </Document>
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
            {expand && (
              <Pagination pagination={pagination}/>
            )}
          </div>
        }

         {attachment.fileType.includes("video") && <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <FilmIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">{attachment.filename}</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.fromISO(mediaLink.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                    download(
                      attachment.url,
                      attachment.filename
                    );
                    mutate()
                   }
                  }
                >
                  {locale("Download")}
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
                    mutate()
                  }}
                  className={`${
                    expandVideo ? "bg-base-600 text-white" : "bg-white text-gray-700"
                  }  inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                >
                  {locale("View")}
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
                      width={"100%"}
                      height={"576px"}
                      url={attachment.url}
                      controls={true}
                      className="object-contain"
                    />
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
          }

          {attachment.fileType.includes("image") && <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1 ">
                  <DeviceMobileIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16 ">{attachment.filename}</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.fromISO(mediaLink.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                    download(
                      attachment.url,
                      attachment.filename
                    )
                    mutate()
                   }
                  }
                >
                  {locale("Download")}
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className={`${
                    expandImage ? "bg-base-600 text-white" : "bg-white text-gray-700"
                  }  inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                  onClick={() => {
                    if (expandImage) {
                      setShowImage(false);
                    } else {
                      setTimeout(() => setShowImage(true), 1000);
                    }
                    setExpandImage(expandImage ? false : true);
                    mutate()
                  }}
                >
                  {locale("View")}
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
                      src={attachment.url}
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
        }
          
          {!attachment.fileType.includes("image") && !attachment.fileType.includes("video") && !attachment.fileType.includes("pdf") && 
          <div className="p-4 bg-white rounded-12 shadow flex flex-col space-y-4 divide-y">
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <div className="space-y-2 flex flex-col mobile:w-full">
                <div className="flex space-x-2.5 mobile:grid mobile:grid-cols-1">
                  <DocumentIcon className="w-6 h-6 mt-0.5 text-base-600 sm:block hidden" />
                  <div className="flex flex-col space-y-2">
                    <p className="sm:med-20 text-base-600 reg-16">{attachment.filename}</p>
                    <p className="text-gray-500 reg-16">
                      {DateTime.fromISO(mediaLink.updatedAt).toLocaleString(DateTime.DATETIME_FULL)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mobile:justify-start mobile:w-full">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  onClick={() => {
                    download(
                      attachment.url,
                      attachment.filename
                    )
                    mutate()
                   }
                  }
                >
                  {locale("Download")}
                  <CloudDownloadIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>}

        </div>}
      </div>
    </div>
  );
}
