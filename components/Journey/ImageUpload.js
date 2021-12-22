import React, { Fragment, useRef, useState, useEffect } from 'react';
import ModalCropImage from './ModalCropImage';
import { PencilAltIcon } from '@heroicons/react/solid';

const ImageUpload = ({ onUpload }) => {
  const cancelButtonRef = useRef(null);

  const [blob, setBlob] = useState(null);
  const [inputImg, setInputImg] = useState('');
  const [show, setShow] = useState(false);
  const [Uid, setUid] = useState('ok');
  const [imgName, setImgName] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result);
        // console.log(reader.result);
        setImgName(e.target.files[0]);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  const handleSubmitImage = (e) => {
    var file = blobToFile(blob, imgName.name);
    handleClose();
    setInputImg();
    // let fileImage = { blob: file, inputImg: imgName.name };
    onUpload(file);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitImage}>
          {inputImg && (
            <ModalCropImage
              getBlob={getBlob}
              inputImg={inputImg}
              onSubmit={handleSubmitImage}
              onCancel={setInputImg}
            />
          )}
        </form>

        {/* <Divider /> */}

        <label
          htmlFor="contained-button-file"
          class="bg-white hover:bg-grey py-2 px-3 rounded-md items-center justify-center border border-gray-300 w-64 flex	cursor-pointer mobile:w-full"
        >
          <PencilAltIcon className="text-current mr-2 w-5 text-gray-400 " />
          <span className="text-sm leading-4 font-medium text-gray-700">
            Change Image
          </span>
        </label>

        <div className="">
          <input
            className="bg-blue-400 text-indigo-50 hidden"
            type="file"
            accept="image/*"
            onChange={onInputChange}
            id="contained-button-file"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
