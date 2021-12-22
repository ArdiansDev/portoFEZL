import { DocumentDuplicateIcon, NewspaperIcon } from "@heroicons/react/outline";
import { useActivity } from "hooks/activity/useActivity";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment"
import { DateTime } from 'luxon'
import ModalRegister from "components/ModalRegister";
import ModalCompleteActivity from "components/ModalCompleteActivity";
import NextImage from "components/NextImage";
import { useEffect } from "react";
import ModalCompleteItem from "components/ModalCompleteItem";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

export default function Webinar() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if(!permission["view_workshop"]) return <div>You are not allowed to enter this page</div>

  const { webinar_id } = router.query;
  const { data:webinar, isLoading } = useActivity({activity_id: webinar_id});

  const [showCopied, setShowCopied] = useState(false);
  const [openRegister, setOpenRegister] = useState();
  const [registered, setRegistered] = useState(); // to be deleted
  const [openComplete, setOpenComplete] = useState(false);

  useEffect(() => {
    setRegistered(webinar?.sessions?.length > 0)
  }, [webinar])

  if (isLoading) return null;
  let { sessions } = webinar;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const register = (event) => {
    setOpenRegister(false)
    setRegistered(event)
  }

  const copyToClipboard = () => {
    const body = document.querySelector("body");
    const paragraph = document.querySelector("#clipboard");
    const area = document.createElement("textarea");
    body.appendChild(area);

    area.value = paragraph.innerText;
    area.select();
    document.execCommand("copy");

    body.removeChild(area);
    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

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
          <p className="med-20 text-gray-900">Webinar</p>
          <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div> */}

        <div className="w-full p-5 bg-white rounded-12 shadow">
          <div className="px-4 py-5 flex sm:flex-row flex-col  gap-10">
            <div className="max-width-350 max-height-350 min-width-200 min-height-200 relative">
              <NextImage
                src={webinar.imageUrl}
                alt=""
                layout="fill"
              />
            </div>
            <div className="flex flex-col justify-between w-full sm:gap-0 gap-2">
              <div className="flex flex-col gap-5">
                <p className="med-20 text-base-600">{webinar.name}</p>
                <pre className="reg-16 text-gray-500 break-words whitespace-pre-line">
                  {webinar.description}
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

      {sessions?.length > 0 && <div div className="flex flex-col space-y-3">
          <p className="reg-20 text-gray-600">{locale("Webinar")}</p>
          {sessions?.map(session => (
            <div className="p-4 bg-white rounded-12 shadow items-center">
              <div className="space-y-2 flex flex-col space-y-4">
                <div className="flex space-x-2.5">
                  <NewspaperIcon className="w-6 mt-0.5 h-6 text-base-600" />
                  <p className="med-20 text-base-600">
                    {locale("You have registered for this webinar at")} {`${new Date(session.startsAt).toLocaleDateString('en-sg', options)}, ${moment(sessions.startsAt).format('HH.mm')} - ${moment(sessions.startsAt).format('HH.mm')} ${DateTime.local().toFormat('ZZZZ')}`}
                  </p>
                </div>
                <div className="rounded-6 border border-blue-400 shadow bg-blue-50 py-2.5 px-4 text-blue-400 flex justify-between">
                  <p id="clipboard" className="text-blue-400 reg-14">
                    {session.link}
                  </p>
                  <div className="relative">
                    <DocumentDuplicateIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={copyToClipboard}
                    />
                    {showCopied && (
                      <div className={`absolute z-10 bottom-10 -left-5`}>
                        {locale("Copied!")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        ))}
        </div> 
      }
        
        {openRegister && <ModalRegister register={register} open={openRegister} setOpen={setOpenRegister} type={"webinar"}/>}
        {openComplete && <ModalCompleteActivity complete={complete} open={openComplete} setOpen={setOpenComplete} type={"webinar"}/>}
        <ModalCompleteItem open={completed} setOpen={()=>{}} type={"Webinar"}/>
      </div>
    </div>
  );
}
