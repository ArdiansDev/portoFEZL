import React from 'react';

export default function ItemsUnlock({ setType, type, jigsaw }) {
  let complete = 'Next Question';
  if (type !== 'next') {
    complete = 'View Result';
  }

  const buttonComplete = () => {
    if (type !== 'next') {
      setType('result');
    } else {
      setType('quiz');
    }
  };

  return (
    <div className="p-10 flex flex-col justify-between  content-space-between height-600">
      <div className="flex justify-center items-center text-white font-bold  ">
        <h1 className="text-4xl">Pieces Unlocked</h1>
      </div>
      <div className="flex space-between flex-col h-full">
        <div className="h-full items-center justify-center flex">
          <div className="z-30 justify-center p-6 gap-6   flex flex-wrap">
            {jigsaw &&
              jigsaw?.map((data) => (
                <img
                  key={data.id}
                  src={data.secureUrl}
                  alt=""
                  className="m-2"
                />
              ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            className="width-400 p-4 border-4 border-white bg-red-300 rounded-3xl text-white text-4xl font-bold"
            onClick={buttonComplete}
          >
            {complete}
          </button>
        </div>
      </div>
    </div>
  );
}
