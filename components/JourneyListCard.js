import React from "react";
import {
  ClipboardListIcon,
  ChartPieIcon,
  LightBulbIcon,
  CollectionIcon,
  CubeIcon,
  FolderOpenIcon,
  LinkIcon
} from "@heroicons/react/outline";
import { CheckCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function JourneyListCard({
  type,
  completed,
  title,
  onClick,
  retake,
  offRetakeLimit,
  remainingAttempts
}) {

  let canOpenWhenCompleted = ["link", "media", "resource"]
 
  const Icon = () => {
    if (type.toLowerCase() === "survey") {
      return <ChartPieIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase() === "quiz") {
      return <LightBulbIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase()=== "task") {
      return <ClipboardListIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase() === "webinar") {
      return <CollectionIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase() === "workshop") {
      return <CubeIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase() === "media") {
      return <FolderOpenIcon stroke="white" className="w-5" />;
    } else if (type.toLowerCase() === "link" || type.toLowerCase() === "resource") {
      return <LinkIcon stroke="white" className="w-5" />;
    }
    
    else {
      return type.toLowerCase()
    }
  };

  const CompleteButton = () => {
    if (completed) {
      return (
        <div className="sm:flex hidden text-green-500 items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          Completed
        </div>
      );
    } else if(offRetakeLimit) {
      return (
        <div className="sm:flex justify-end width-300 hidden text-red-500 items-center gap-2 med-16">
          <div class='has-tooltip'>
            <span class='tooltip max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-16  reg-12'>Please approach your facilitator to request for an additional attempt.</span>
            <QuestionMarkCircleIcon className="w-5 h-5 text-red-500" />
          </div>
          Max Tries Exceeded
        </div>
      )
    } else {
      return (
        <button onClick={()=>onClick && onClick()} className={`sm:block hidden bg-base-600 ${retake ? "width-320" : "width-120"} text-white rounded-6 height-42 med-16`}>
          {retake ? `Retake (${remainingAttempts} Remaining)` : "Start"}
        </button>
      );
    }
  };

  const CompleteButtonMobile = () => {
    if (completed) {
      return (
        <div className="sm:hidden flex text-green-500 items-center gap-2 reg-14">
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
          Completed
        </div>
      );
    } else if(offRetakeLimit) {
      return (
        <div className="sm:hidden flex text-red-500 items-center gap-2 reg-14">
          Max Tries Exceeded
        </div>
      )
    } else {
      return (
        <button onClick={()=>onClick && onClick()} className={`sm:hidden block bg-base-600 ${retake ? "width-180" : "width-120"} px-2 text-white rounded-6 py-2 reg-14`}>
          {retake ? `Retake  (${remainingAttempts} Remaining)` : "Start"}
        </button>
      );
    }
  };
  
  const Content = () => {
    if (completed) {
      return (
        <div className="bg-green-500 rounded-6 width-30 height-30 items-center justify-center flex">
          <Icon />
        </div>
      );
    } else if(offRetakeLimit) {
      return (
        <div className="bg-red-500 rounded-6 width-30 height-30 items-center justify-center flex">
          <Icon />
        </div>
      )
    } else {
      return (
        <div className={`bg-base-500 rounded-lg width-30 height-30 items-center justify-center flex`}>
          <Icon />
        </div>
      );
    }
  };

  return (
    <div className="bg-white w-full rounded-lg p-5 flex justify-between items-center shadow hover:shadow-lg">
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <Content />
            <p className={`reg-16 sm:med-16 capitalize ${completed ? "text-green-500" : "text-base-600"}`}>{type}</p>
          </div>

          {canOpenWhenCompleted.includes(type.toLowerCase()) && completed ? 
            <div className="sm:hidden flex flex-col gap-4 items-end">
                <CompleteButton />
                <p className="med-16 text-base-600 hover:underline cursor-pointer" onClick={()=>onClick && onClick()}>
                  View Again
                </p>
            </div>
            :
            <CompleteButtonMobile />
          }

        </div>
        <p className="reg-16 sm:reg-20 text-gray-700">{title}</p>
      </div>

      {canOpenWhenCompleted.includes(type.toLowerCase()) && completed ? 
        <div className="sm:flex hidden flex-col gap-4 items-end">
            <CompleteButton />
            <p className="med-16 text-base-600 hover:underline cursor-pointer" onClick={()=>onClick && onClick()}>
              View Again
            </p>
        </div>
        :
        <CompleteButton />
      }

    </div>
  );
}
