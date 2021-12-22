import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import React from 'react';
import { locale } from 'utils/locale';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function QuizOptions3({ options, answerResponse, onChange }) {
  const [selected, setSelected] = useState({});
  const correctAnswer = answerResponse?.option?.correctAnswer;
  let { id: answerOptionId } = answerResponse?.option || {};
  let { question } = answerResponse || {};
  let { explanation, explanationImageUrl } = question || {};
  const [checked2, setChecked2] = useState('');
  const [alreadyChecked, setAlreadyChecked] = useState(false);
  const onChangeChoice = (data) => {
    if (correctAnswer !== undefined) {
      return;
    } else {
      setAlreadyChecked(true);
      setSelected(data);
      setChecked2(data);
      onChange(data);
    }
  };

  return (
    <RadioGroup value={selected} onChange={() => {}}>
      <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
      <div className="bg-white  rounded-6 space-y-3 ">
        {options?.map((option) => (
          <div
            className="flex space-y-3 flex-col"
            onClick={(e) => {
              e.stopPropagation();
              onChangeChoice(option);
            }}
            key={option.id}
          >
            <div className="flex gap-2 items-center">
              <RadioGroup.Option
                key={option.content}
                value={option}
                className={({ checked, active }) =>
                  classNames(
                    'rounded-12',
                    !checked
                      ? 'border-gray-200'
                      : checked && correctAnswer === undefined
                      ? 'bg-base-100 border-base-200'
                      : correctAnswer && answerOptionId === selected.id
                      ? 'bg-green-100 border-green-200'
                      : 'bg-red-100 border-red-200',
                    'relative border p-4 flex  flex-1 cursor-pointer focus:outline-none'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        !checked
                          ? 'bg-white border-gray-300 min-width-16'
                          : checked && correctAnswer === undefined
                          ? 'bg-white border-base-600 min-width-16'
                          : correctAnswer && answerOptionId === selected.id
                          ? 'bg-white border-green-600 min-width-16'
                          : 'bg-white border-red-600 min-width-16',
                        'sm:flex h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center min-width-16 '
                      )}
                      aria-hidden="true"
                    >
                      {checked && (
                        <span
                          className={`rounded-full ${
                            checked && correctAnswer === undefined
                              ? 'bg-base-500'
                              : correctAnswer && answerOptionId === selected.id
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          } w-2 h-2`}
                        />
                      )}
                    </span>

                    <div className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          !checked
                            ? 'text-gray-900'
                            : checked && correctAnswer === undefined
                            ? 'text-base-900'
                            : correctAnswer && answerOptionId === selected.id
                            ? 'text-green-700'
                            : 'text-red-700',
                          'block text-sm font-medium leading-5'
                        )}
                      >
                        {option.content}
                      </RadioGroup.Label>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
              {selected.id === option.id &&
              correctAnswer !== undefined &&
              answerOptionId === option.id ? (
                <>
                  <XCircleIcon
                    className={
                      correctAnswer == false && answerOptionId === selected.id
                        ? 'w-7 h-7 text-red-500 height-50'
                        : 'hidden'
                    }
                  />
                  <CheckCircleIcon
                    className={
                      correctAnswer == true && answerOptionId === selected.id
                        ? 'w-7 h-7 text-green-500 height-50'
                        : 'hidden'
                    }
                  />
                </>
              ) : (
                <div className="min-width-30"></div>
              )}
            </div>
            {selected.id === option.id &&
              correctAnswer !== undefined &&
              answerOptionId === option.id && (
                <div className="py-3">
                  <div className="flex gap-4">
                    <div className="border border-l-4 border-gray-200" />

                    <div className="flex flex-col gap-4">
                      {/* <NextImage
                        alt="quiz-image"
                        src={explanationImageUrl}
                        layout="fixed"
                        width={248}
                        height={248}
                        placeholder="blur"
                      /> */}

                      <p className="reg-16 text-gray-500">
                        {locale('Explanation:')}
                      </p>

                      <p className="reg-16 text-gray-500 pr-8 ">
                        {explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
