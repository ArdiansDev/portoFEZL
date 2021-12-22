import {
  ChevronDownIcon,
  ChevronRightIcon,
  ViewGridIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Card from './Card';

export default function Container({ menu, setMenu, onChange }) {
  const onSetList = (newState, sectionIndex) => {
    let prevSection = menu;
    let newSection = prevSection.find((data, i) => i == sectionIndex);
    newSection['section_items'] = newState;
    prevSection[sectionIndex] = newSection;
    setMenu(JSON.parse(JSON.stringify(prevSection)));
  };

  const onDelete = (index) => {
    let prevSection = menu;
    let newSection = prevSection.filter((data, i) => i != index);

    setMenu(JSON.parse(JSON.stringify(newSection)));
  };

  const onShowItem = (sectionIndex) => {
    let prevSection = menu;
    let newSection = prevSection.find((data, i) => i == sectionIndex);
    newSection['showItem'] = newSection['showItem'] ? false : true;
    prevSection[sectionIndex] = newSection;
    setMenu(JSON.parse(JSON.stringify(prevSection)));
  };

  return (
    <div className="menu my-4">
      <ReactSortable
        list={menu}
        setList={setMenu}
        swap
        multiDrag
        animation={150}
        group="cards"
        onChange={(order, sortable, evt) => {
          console.log('order, sortable, evt');
          console.log(order, sortable, evt);
        }}
        onEnd={(evt) => {
          console.log(evt);
        }}
      >
        {menu.map((itm, index) => {
          return (
            <div className="sub-menu my-4" key={index}>
              <div className="flex">
                <div className="flex justify-between border rounded-md px-2 py-2 mb-2 w-full">
                  <div className="flex">
                    <ViewGridIcon className="text-current w-5" fill="gray" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={(e) => onChange(e, index)}
                      value={itm.object_type}
                      className="appearance-none block w-full  border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent focus:border-0 sm:text-sm"
                    />
                  </div>
                  {itm.showItem ? (
                    <ChevronDownIcon
                      className="text-current w-5"
                      fill="gray"
                      onClick={() => onShowItem(index)}
                    />
                  ) : (
                    <ChevronRightIcon
                      className="text-current w-5"
                      fill="gray"
                      onClick={() => onShowItem(index)}
                    />
                  )}
                </div>
                <XCircleIcon
                  className="text-current w-5"
                  fill="gray"
                  onClick={() => onDelete(index)}
                />
              </div>
              {itm.showItem && itm.section_items && (
                <ReactSortable
                  list={itm.section_items}
                  setList={(newState) => onSetList(newState, index)}
                  animation={150}
                  group="cards"
                  onChange={(order, sortable, evt) => {
                    console.log(order, sortable, evt);
                  }}
                  onEnd={(evt) => {
                    console.log(evt);
                  }}
                >
                  {itm.section_items.map((item) => (
                    <Card
                      key={item.id}
                      item={item}
                      onChange={(e) => onChange(e, index)}
                    />
                  ))}
                </ReactSortable>
              )}
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
}
