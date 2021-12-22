import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
let MenuList = [
  { name: 'Admin' },
  { name: 'Department1' },
  { name: 'Department2' },
  { name: 'IT' },
  { name: 'Department2' },
  { name: 'Happiness' },
  { name: 'Human Resource' },
  { name: 'Product' },
  { name: 'UAT' },
];
export default function DropdownCategory({ value, setCategory }) {
  return (
    <Menu
      as="div"
      className="width-170 relative inline-block text-left  sm:width-160"
    >
      <div>
        <Menu.Button className=" inline-flex justify-between max-height-38 width-170 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ">
          {value}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {MenuList.map((item) => (
            <div className="py-1">
              <Menu.Item onClick={() => setDepartmentName(item.name)}>
                {({ active }) => (
                  <h1
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {item.name}
                  </h1>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
