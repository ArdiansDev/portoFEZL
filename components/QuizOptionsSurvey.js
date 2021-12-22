import { RadioGroup } from "@headlessui/react";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function QuizOptions({ options, onChange, answerId}) {
  const selected = options?.find(option => option.id === answerId) ?? {};
  const onChangeAnswer = (data) => {
    onChange(data);
  };

  return (
    <RadioGroup value={selected} onChange={onChangeAnswer}>
      <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
      <div className="bg-white rounded-6 space-y-3">
        {options?.map((option) => (
          <div
            className="flex space-y-3 flex-col"
            onClick={() => onChangeAnswer(option)}
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
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
