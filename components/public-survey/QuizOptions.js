import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function QuizOptions({ options, onChange}) {
  const [selected, setSelected] = useState();
  const onChangeAnswer = (data) => {
    onChange(data);
    setSelected(data)
  };

  return (
    <RadioGroup value={selected} onChange={onChangeAnswer}>
      <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
      <div className="bg-white rounded-6 space-y-3">
        {options?.map((option) => (
          <div
            className="flex space-y-3 flex-col"
            key={option.id}
          >
            <RadioGroup.Option
              key={option.content}
              value={option}
              className={({ checked }) =>
                classNames(
                  "rounded-12",
                  !checked
                    ? "border-gray-200"
                    : "bg-base-100 border-base-200",
                  "relative border p-4 flex cursor-pointer focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      !checked
                        ? "bg-white border-gray-300"
                        : "bg-white border-base-600",
                      "sm:flex hidden h-4 w-4 mt-0.5 cursor-pointer rounded-full border items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    {checked && <span className="rounded-full bg-base-500 w-2 h-2" />}
                  </span>
                  <div className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        !checked
                          ? "text-gray-900"
                          : "text-base-600",
                        "block text-sm font-medium leading-5"
                      )}
                    >
                      {option.content}
                    </RadioGroup.Label>
                  </div>
                </>
              )}
            </RadioGroup.Option>
            {/* {option.content === checked2.content &&
              checked2.content !== correctAnswer && (
                <div className="py-3">
                  <div className="flex space-y-4">
                    <div className="border border-l-4 border-gray-200" />
                    <div className="flex flex-col space-y-4">
                      <NextImage
                        alt="quiz-image"
                        src={ComputerImage}
                        layout="fixed"
                        width={248}
                        height={248}
                        placeholder="blur"
                      />
                      <p className="reg-16 text-gray-500">Explanation:</p>
                      <p className="reg-16 text-gray-500">
                        “Sagittis scelerisque nulla cursus in enim consectetur
                        quam. Dictum urna sed consectetur neque tristique
                        pellentesque. Blandit amet, sed aenean erat arcu morbi.”
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
