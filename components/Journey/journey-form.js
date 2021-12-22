import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';

import thumbnailJourney from 'public/abc/thumbnailJourney.png';
import { SwitchButton } from 'components/SwitchButton';
import { useGetPresign } from 'hooks/resources/useResources';
import ItemForm from './ItemForm';
import DropDown from 'components/Journey/DropDown';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import _ from 'lodash';

export default function JourneyForm({ setForm, formData, navigation, badges }) {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['view_link'])
    return <div>You are not allowed to enter this page</div>;

  let {
    title,
    description,
    imageUrl,
    imageSecureUrl,
    image,
    rewardCoin,
    rewardScore,
    rewardStamp,
    rewardGem,
    stampId,
    stamp,
  } = formData;

  const { next } = navigation;

  imageUrl = imageUrl ?? imageSecureUrl;

  const [selectedFile, setSelectedFile] = useState(
    image ?? { preview: '', raw: '' }
  );
  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  const onUpload = (e) => {
    // var myBlob = new Blob();

    //do stuff here to give the blob some data...

    var file = blobToFile(e, 'my-image.png');

    // let file = new File([e], 'imageUplaoded');
    const newEdit = { ...formData };
    let image = {
      preview: URL.createObjectURL(file),
      raw: file,
    };
    setSelectedFile(image);

    newEdit['image'] = image;
    setForm(_.cloneDeep(newEdit));
  };

  const filename = selectedFile?.raw.name;
  const { data: presignData, refetch: presignRefetch } = useGetPresign({
    query: { directory: 'images', extension: 'jpg', filename: filename },
    options: { enabled: !!filename },
  });

  useEffect(() => {
    if (filename) {
      presignRefetch();
    }
  }, [filename]);

  useEffect(() => {
    if (presignData) {
      let newForm = {
        ...formData,
        imageUrl: presignData.data.downloadUrl,
        presignData,
      };
      setForm(_.cloneDeep(newForm));
    }
  }, [presignData]);

  const onChangeForm = (e) => {
    let newForm = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setForm(_.cloneDeep(newForm));
  };

  const onSelectBadge = (e) => {
    let newForm = {
      ...formData,
      stampId: e.id,
      stamp: e,
    };
    setForm(_.cloneDeep(newForm));
  };

  const onOffButton = (e, type) => {
    const newEdit = { ...formData };

    switch (type) {
      case 'badge':
        newEdit['stampId'] = undefined;
        newEdit['stamp'] = undefined;
        setBadge(e);
        break;

      case 'score':
        newEdit['rewardScore'] = e ? newEdit['rewardScore'] : 0;
        setScore(e);
        break;

      case 'coins':
        newEdit['rewardCoin'] = e ? newEdit['rewardCoin'] : 0;
        setCoins(e);
        break;

      case 'gems':
        newEdit['rewardGem'] = e ? newEdit['rewardGem'] : 0;
        setGems(e);
        break;
    }
    setForm(_.cloneDeep(newEdit));
  };

  const onContinue = () => {
    if (title.length > 0) {
      next();
    }
  };

  const [badge, setBadge] = useState(!!stampId);
  const [score, setScore] = useState(!!rewardScore);
  const [coins, setCoins] = useState(!!rewardCoin);
  const [gems, setGems] = useState(!!rewardGem);

  useEffect(() => {
    if (rewardScore) {
      setScore(rewardScore > 0 ? true : false);
    }
    if (rewardCoin) {
      setCoins(rewardCoin > 0 ? true : false);
    }
    if (rewardGem) {
      setGems(rewardGem > 0 ? true : false);
    }
    if (stampId) {
      setBadge(stampId > 0 ? true : false);
    }
  }, [rewardScore, rewardCoin, rewardGem, stampId]);

  const pathArray = router.pathname.split('/');
  const pageTitle = pathArray[3] == 'edit' ? 'Edit Journey' : 'Create Journey';

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full space-y-4 ">
        <h1 className="text-xl my-4 flex  items-center font-medium leading-7 text-black">
          <ArrowLeftIcon
            className="h-5 w-5 mr-5 cursor-pointer"
            onClick={() => router.push('/admin/journey')}
          />
          {pageTitle}
        </h1>
        <div className="bg-white shadow rounded-xl flex mobile:flex-col">
          <div className="max-width-300 mobile:height-40 p-4 sm:p-10">
            <h1 className="text-gray-900 reg-20">Journey Details</h1>
            <p className="text-gray-500 reg-14 invisible">
              Input your journey title and description here.
            </p>
          </div>
          <div className="w-full p-5">
            <div className="space-y-6 w-full shadow	 p-5 rounded-sm ">
              <ItemForm
                label="Title *"
                name="title"
                value={title}
                onChange={onChangeForm}
              />
              <ItemForm
                label="Description"
                name="description"
                value={description}
                onChange={onChangeForm}
                type="textarea"
              />
              <ItemForm
                label="Journey Thumbnail"
                name="imageUrl"
                src={selectedFile.preview ? selectedFile.preview : imageUrl}
                value={selectedFile.raw.name}
                onUpload={onUpload}
                thumbnail={thumbnailJourney}
                type="imageUpload"
              />
            </div>
          </div>
        </div>
        {/*Gamification */}
        <div className="bg-white shadow rounded-xl flex mobile:flex-col">
          <div className="max-width-300 p-10 mobile:pb-0 mobile:pl-5">
            <h1 className="text-gray-900 reg-20 mb-5 mobile:mb-0">
              Gamification{' '}
            </h1>
            {/* <p className="text-gray-500 reg-14 invisible ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p> */}
          </div>
          <div className="w-full p-5">
            <div className="space-y-6 w-full shadow	 p-5 rounded-sm ">
              <div>
                <div className="flex justify-between item-center">
                  <label
                    htmlFor="badge"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Awarded Badge
                  </label>

                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <SwitchButton
                      checked={badge}
                      onChange={(e) => onOffButton(e, 'badge')}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="badgeValue"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Badge
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <DropDown
                      data={badges?.data}
                      onSelect={onSelectBadge}
                      selected={stamp}
                      placeholder={'Select Badge'}
                      disabled={badge ? false : true}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between item-center">
                  <label
                    htmlFor="score"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Awarded Score
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <SwitchButton
                      checked={score}
                      onChange={(e) => onOffButton(e, 'score')}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="rewardScore"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Score
                  </label>
                  <div
                    className={
                      score
                        ? ' flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-transparent'
                        : 'flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-gray-50		'
                    }
                  >
                    <input
                      id="rewardScore"
                      name="rewardScore"
                      type="text"
                      disabled={score ? false : true}
                      value={rewardScore}
                      onChange={onChangeForm}
                      className="appearance-none pr-2 py-1 w-full block border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent	 focus:border-0 sm:text-sm disabled:bg-gray-50"
                    />
                    <span className="text-sm text-gray-500">Scores</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between item-center">
                  <label
                    htmlFor="rewardCoin"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Awarded Coins
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <SwitchButton
                      checked={coins}
                      onChange={(e) => onOffButton(e, 'coins')}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="rewardCoin"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Coins
                  </label>
                  <div
                    className={
                      coins
                        ? ' flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-transparent'
                        : 'flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-gray-50		'
                    }
                  >
                    <input
                      id="rewardCoin"
                      name="rewardCoin"
                      type="text"
                      disabled={coins ? false : true}
                      value={rewardCoin}
                      onChange={onChangeForm}
                      className="appearance-none pr-2 py-1 w-full block border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent	 focus:border-0 sm:text-sm disabled:bg-gray-50"
                    />
                    <span className="text-sm text-gray-500"> Coins</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between item-center">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                  >
                    Awarded Gems
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <SwitchButton
                      checked={gems}
                      onChange={(e) => onOffButton(e, 'gems')}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Gems
                  </label>
                  {/* <div className="mt-1 sm:mt-0 sm:col-span-2"> */}
                  <div
                    className={
                      gems
                        ? ' flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-transparent'
                        : 'flex flex-row w-full pr-2 py-0 border border-gray-300 rounded-md shadow-sm items-center h-10 bg-gray-50		'
                    }
                  >
                    <input
                      id="rewardGem"
                      name="rewardGem"
                      type="text"
                      disabled={gems ? false : true}
                      value={rewardGem}
                      onChange={onChangeForm}
                      className="appearance-none pr-2 py-1 w-full block border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent	 focus:border-0 sm:text-sm disabled:bg-gray-50"
                    />
                    <span className="text-sm text-gray-500"> Gems</span>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-end">
          <button
            class="bg-white hover:bg-base-100 text-base-500 font-normal py-2 px-10 mr-4 border border-base-400 rounded-md shadow"
            onClick={() => router.push('/admin/journey')}
          >
            Cancel
          </button>
          <button
            class="bg-base-500 hover:bg-bases-700 text-white font-normal py-2 px-10 rounded-md disabled:bg-gray-200 disabled:text-gray-400"
            onClick={onContinue}
            disabled={title.length === 0}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
}
