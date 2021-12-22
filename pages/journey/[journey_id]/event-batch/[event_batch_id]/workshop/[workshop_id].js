import { useRouter } from "next/router";
import { useActivity } from "hooks/activity/useActivity";
import { CheckCircleIcon } from '@heroicons/react/solid'
import { OfficeBuildingIcon } from "@heroicons/react/outline";
import moment from "moment"
import { DateTime } from 'luxon'
import ModalCompleteActivity from 'components/ModalCompleteActivity';
import {useEffect, useState} from "react";
import ModalRegister from "components/ModalRegister";
import ModalConfirmationTask from "components/ModalConfirmationTask";
import NextImage from "components/NextImage";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

export default function Webinar() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if(!permission["view_webinar"]) return <div>You are not allowed to enter this page</div>

  const { workshop_id } = router.query;
  const { data:workshop, isLoading } = useActivity({activity_id: workshop_id});
  const [openRegister, setOpenRegister] = useState();
  const [openComplete, setOpenComplete] = useState(false);

  const [openConfirmationTask, setOpenConfirmationTask] = useState();
  const [registered, setRegistered] = useState(); // to be deleted

  useEffect(() => {
    setRegistered(workshop?.sessions?.length > 0)
  }, [workshop])

  if (isLoading) return null;
  let { sessions } = workshop;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const register = (event) => {
    setOpenRegister(false)
    setRegistered(event)
  }

  const complete = () => {

  }

  let completed = false;

  return (
    <div className="min-h-screen">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen space-y-7">
      {/* <div className="height-38 flex justify-between">
          <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
          </div>
          <p className="med-20 text-gray-900">Workshop</p>
          <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div> */}
        <div className="w-full p-5 bg-white rounded-12 shadow">
          <div className="px-4 py-5 flex sm:flex-row flex-col  gap-10">
            <div className="max-width-350 max-height-350 min-width-200 min-height-200 relative">
              <NextImage
                src={workshop.imageUrl}
                alt=""
                layout="fill"
                className="rounded-8"
              />
            </div>
            <div className="flex flex-col justify-between w-full sm:gap-0 gap-2">
              <div className="flex flex-col gap-5">
                <p className="med-20 text-base-600">{workshop.name}</p>
                <pre className="reg-16 text-gray-500 break-words whitespace-pre-line">
                  {workshop.description}
                </pre>
              </div>
              <div className="flex gap-3 self-center md:self-end">
                {registered ? 
                 <button
                 type="button"
                 className="inline-flex justify-center items-center py-2.5 width-200 border border-transparent med-16 rounded-8 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                 onClick={() => setOpenComplete(true)}
               >
                 {locale("Mark as Completed")}
               </button>
                :
                <button
                type="button"
                className="inline-flex justify-center items-center py-2.5 width-200 border border-transparent med-16 rounded-8 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                onClick={() => setOpenRegister(true)}
              >
                {locale("Register")}
              </button>
                }
              </div>
            </div>
          </div>
        </div>
        {sessions?.length > 0 &&
          <div className="flex flex-col space-y-3">
            <p className="reg-20 text-gray-600">{locale("Workshop")}</p>
            {sessions?.map(session => (
              <div className="p-4 bg-white rounded-12 shadow items-center flex flex-col sm:flex-row sm:gap-0 gap-2 justify-between">
                <div className="space-y-2 flex flex-col space-y-2">
                  <div className="flex space-x-2.5">
                    <CheckCircleIcon className="w-6 mt-0.5 h-6 text-base-600" />
                    <p className="med-20 text-base-600">{locale("You have registered for this workshop at")} </p>
                  </div>
                  <div className="flex space-x-2.5">
                    <OfficeBuildingIcon className="w-5 mt-0.5 h-5 ml-0.5 text-gray-600" />
                    <div className="flex flex-col space-y-2">
                    <p className="reg-16 text-gray-600">{session.location}</p>
                    <p className="reg-16 text-gray-600">
                      {`${new Date(session.startsAt).toLocaleDateString('en-sg', options)}, ${moment(session.startsAt).format('HH.mm')} - ${moment(session.endsAt).format('HH.mm')} ${DateTime.fromISO(session.endsAt).setLocale('en-sg').toFormat('ZZZZ')}`}
                    </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="iinline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={()=>setOpenConfirmationTask(true)}
                >
                  {locale("Withdraw")}
                </button>
              </div>
            ))}
          </div>
        }
      </div>
      {openComplete && <ModalCompleteActivity complete={complete} open={openComplete} setOpen={setOpenComplete} type={"workshop"}/>}
      {openRegister && <ModalRegister register={register} open={openRegister} setOpen={setOpenRegister} type={"workshop"}/>}
      {openConfirmationTask && <ModalConfirmationTask open={openConfirmationTask} setOpen={setOpenConfirmationTask} type={"workshop"} />}
      <ModalCompleteItem open={completed} setOpen={()=>{}} type={"Workshop"}/>
    </div>
  );
}
