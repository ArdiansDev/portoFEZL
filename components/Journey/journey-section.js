import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import {
  ArrowLeftIcon,
  ClipboardListIcon,
  CollectionIcon,
  FolderOpenIcon,
  LightBulbIcon,
  LightningBoltIcon,
  LinkIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import usePagination from '@lucasmogari/react-pagination';
import ModalLinks from './ModalLinks';
import ModalMedia from './ModalMedia';
import ModalResource from './ModalResource';
import DragDropItem from 'components/DragDrop/DragDropItem';
import ModalQuiz from './ModalQuiz';
import ModalSurvey from './ModalSurvey';
import ModalAlert from 'components/ModalAlert';
import { submitJourney, editJourneyData } from 'hooks/journeys/useJourney';
import axios from 'axios';

export default function JourneySection({
  formData,
  navigation,
  setForm,
  journeyId,
} = {}) {
  const { items } = formData;
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['view_link'])
    return <div>You are not allowed to enter this page</div>;

  const [treeData, setTreeData] = useState({
    treeData: items,
  });

  const [openQuiz, setOpenQuiz] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);

  const [openSurvey, setOpenSurvey] = useState(false);
  const [openResourse, setOpenResource] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [remarks, setRemarks] = useState(false);

  const addSection = () => {
    let newTreeData = _.cloneDeep(treeData);
    newTreeData.treeData.unshift({
      title: 'New Section',
      objectType: 'journey_section',
      isSection: true,
    });

    setTreeData(newTreeData);
  };

  const {
    mutate: addJourney,
    data: submitionResponseAdd,
    error: errorAdd,
    isLoading: pendingSubmitAdd,
  } = submitJourney({
    ...formData,
  });

  const {
    mutate: editJourney,
    data: submitionResponseEdit,
    error: errorEdit,
    isLoading: pendingSubmitEdit,
  } = editJourneyData({
    ...formData,
  });

  const onSubmit = () => {
    // mutate()

    const pathname = router.pathname;
    const submitJourney = pathname.includes('edit') ? editJourney : addJourney;

    if (formData?.image) {
      let imageData = new FormData();
      imageData.append('Blob', formData?.image?.raw);
      const uploadUrl = formData.presignData?.data?.uploadUrl;
      var config = {
        method: 'put',
        url: uploadUrl,
        headers: {
          'Content-Type': formData?.image?.raw.type,
        },
        data: formData.image.raw,
      };
      axios(config).then((data) => {
        submitJourney(journeyId);
        console.log('formData.totalUser', formData.totalUser);
        if (formData?.totalUser > 0) {
          router.push('/admin/journey?tab=assigned&saved=true');
        } else {
          router.push('/admin/journey?saved=true');
        }
      });
    } else {
      submitJourney(journeyId);
      console.log('formData.totalUser', formData.totalUser);
      if (formData?.totalUser > 0) {
        router.push('/admin/journey?tab=assigned&saved=true');
      } else {
        router.push('/admin/journey?saved=true');
      }
    }
  };

  useEffect(() => {
    if (submitionResponseAdd || submitionResponseEdit) {
      router.push('/admin/journey');
    }
    let error = errorEdit || errorAdd;
    if (error) {
      setRemarks(error?.data.errors[0]);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [submitionResponseAdd, submitionResponseEdit]);

  const addItem = (item) => {
    let newTreeData = _.cloneDeep(treeData);
    item.map((itm) => {
      newTreeData.treeData.unshift({
        title: itm.name || itm.title,
        itemType: itm.itemType,
        isSection: false,
        id: itm.id,
      });
    });

    setTreeData(newTreeData);
  };

  useEffect(() => {
    let newForm = _.cloneDeep(formData);
    let newTreeData = _.cloneDeep(treeData);
    newForm.items = newTreeData.treeData;
    setForm(newForm);
  }, [treeData]);

  const item = [
    {
      name: 'Quiz',
      icon: <LightningBoltIcon className="text-current  w-5  m-auto" />,
    },
    {
      name: 'Survey',
      icon: <CollectionIcon className="text-current w-5  m-auto" />,
    },
    {
      name: 'Resource',
      icon: <LightBulbIcon className="text-current w-5  m-auto" />,
    },
    {
      name: 'Task',
      icon: <ClipboardListIcon className="text-current w-5  m-auto" />,
    },
    {
      name: 'Link',
      icon: <LinkIcon className="text-current  w-5  m-auto" />,
    },
    {
      name: 'Media',
      icon: <FolderOpenIcon className="text-current w-5  m-auto" />,
    },
  ];

  const onOpenModel = (item) => {
    switch (item.name) {
      case 'Quiz':
        setOpenQuiz(true);
        break;
      case 'Survey':
        setOpenSurvey(true);
        break;
      case 'Resource':
        setOpenResource(true);
        break;
      case 'Task':
        break;
      case 'Link':
        setOpenLink(true);
        break;
      case 'Media':
        setOpenMedia(true);
        break;
    }
  };
  if (pendingSubmitAdd || pendingSubmitEdit) return null;

  const pathArray = router.pathname.split('/');
  const submitButton = pathArray[3] == 'edit' ? 'Save' : 'Create';

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full space-y-4 ">
        <h1 className="text-xl my-4 flex  items-center font-medium leading-7 text-black">
          <ArrowLeftIcon
            className="h-5 w-5 mr-5 cursor-pointer"
            onClick={() => navigation.previous()}
          />
          New Journey
        </h1>
        <div className="bg-white shadow rounded-xl flex mobile:flex-col">
          <div className="max-width-300 p-10 mobile:p-0 mobile:pt-5 mobile:pl-5">
            <h1 className="text-gray-900 reg-20">Journey Item and Section</h1>
          </div>
          <div className="w-full p-5">
            <div className="space-y-6 w-full shadow	 p-5 rounded-sm ">
              <span className="text-base text-gray-700">Add Item</span>
              <div className=" grid grid-cols-3 gap-4 flex-wrap mobile:grid-cols-2">
                {item.map((itm, index) => {
                  return (
                    <button
                      className={`${
                        itm.name === 'Task'
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      } width-screen-20 w-full shadow height-100 rounded-lg  mobile:mt-2 flex items-center px-6 py-5 mobile:p-4 text-gray-700  mobile:h-max mobile:w-full justify-center disabled:bg-gray-100 disabled:text-gray-300`}
                      onClick={() => onOpenModel(itm)}
                      disabled={itm.name === 'Task' ? true : false}
                    >
                      <div className="justify-center items-center">
                        {itm.icon}

                        <span className="text-xs">{itm.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                className="flex items-center border rounded w-full justify-center  h-14 bg-base-50"
                onClick={addSection}
              >
                <PlusIcon className="text-current mr-2 w-5" fill="gray" />
                <span className="text-gray-500 text-xs">Add Section</span>
              </button>
              <div className="flex items-center">
                <span className="w-1/6 text-sm text-gray-500">
                  Journey Items
                </span>
                <div className="w-5/6 border-solid border-b-2 border-light-gray-500"></div>
              </div>

              {treeData?.treeData?.length > 0 ? (
                <DragDropItem treeData={treeData} setTreeData={setTreeData} />
              ) : (
                <p>The item is empty please add new item</p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex justify-end">
          <button
            class="bg-white hover:bg-base-100 text-base-500 font-normal py-2 px-10 mr-4 border border-base-400 rounded-md shadow"
            onClick={() => navigation.previous()}
          >
            Back
          </button>
          <button
            class="bg-base-500 hover:bg-base-700 text-white font-normal py-2 px-10  rounded-md disabled:bg-gray-500"
            disabled={treeData?.treeData?.length > 0 ? false : true}
            onClick={onSubmit}
          >
            {submitButton}
          </button>
        </div>
        {openLink && (
          <ModalLinks
            // pagination={pagination}
            open={openLink}
            setOpen={setOpenLink}
            onAddItem={addItem}
          />
        )}
        {openMedia && (
          <ModalMedia
            open={openMedia}
            setOpen={setOpenMedia}
            onAddItem={addItem}
          />
        )}
        {openResourse && (
          <ModalResource
            open={openResourse}
            setOpen={setOpenResource}
            onAddItem={addItem}
          />
        )}
        {openQuiz && (
          <ModalQuiz
            open={openQuiz}
            setOpen={setOpenQuiz}
            onAddItem={addItem}
          />
        )}
        {openSurvey && (
          <ModalSurvey
            open={openSurvey}
            setOpen={setOpenSurvey}
            onAddItem={addItem}
          />
        )}

        {showAlert && (
          <ModalAlert
            Show={showAlert}
            setShow={setShowAlert}
            statusAndRemarks={{ status: 'false', remarks: remarks.message }}
          />
        )}
      </section>
    </div>
  );
}
