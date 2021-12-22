import NextImage from 'components/NextImage';
import React, { useState, useEffect } from 'react';
import Pagination from 'components/Pagination';
import xClose from 'public/abc/xClose.svg';
import usePagination from '@lucasmogari/react-pagination';

const HistoryModal = ({ setGameId, data, Show, setVisible, setShow }) => {
  function reverseArr(input) {
    var ret = [];
    for (var i = input?.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  const handleClose = () => {
    setVisible(false);
  };
  const History = reverseArr(data?.data);
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


  useEffect(() => {
    if (data?.data) {
      setTotalItems(data?.data?.length);
    }
  }, [data]);
  const paginate = History?.slice(5 * (page - 1), 5 * page) || [];

  return (
    <div style={Show ? { display: 'block' } : { display: 'none' }}>
      <div
        onClick={handleClose}
        className="z-20 fixed top-0 left-0 bg-black opacity-30"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>
      <div className="bg-white shadow z-40 p-8 flex flex-col text-center width-729 h-max max-height-644 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl ">
        <div
          onClick={handleClose}
          className="absolute right-6 top-4 cursor-pointer w-max h-max"
        >
          <NextImage
            src={xClose}
            alt=""
            width={10}
            height={10}
            layout="fixed"
          />
        </div>
        <h1>My Challenge History</h1>
        <div className="w-full ">
          {paginate &&
            paginate?.map((data) => (
              <div
                key={data.id}
                onClick={async () => {
                  if (data.state === 'declined') {
                  } else {
                    await setGameId(data.challenge.id);
                    setVisible(false);
                    setShow(true);
                  }
                }}
                className=" cursor-pointer flex justify-between w-full mt-4 p-4 border border-gray-300 rounded-lg"
              >
                <span>
                  <h1 className="text-base-600 text-left max-h-12 max-w-lg overflow-hidden">
                    {data.challenge.title}
                  </h1>
                  <p className="text-xs text-left text-gray-400">
                    Invitational Challenge
                  </p>
                </span>
                <div
                  className={`${
                    data.state === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  } text-sm  p-1 rounded  w-20 text-center h-max capitalize`}
                >
                  {data.state}
                </div>
              </div>
            ))}
          {data?.data?.length > 5 && (
            <Pagination
              pagination={pagination}
              className={'rounded-bl-lg rounded-br-lg'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
