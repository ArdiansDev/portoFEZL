import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
};

export default function Container({ menu, setMenu, onChange }) {
  console.log(menu);
  const onShowItem = (sectionIndex) => {
    let prevSection = menu;
    let newSection = prevSection.find((data, i) => i == sectionIndex);
    newSection['showItem'] = newSection['showItem'] ? false : true;
    prevSection[sectionIndex] = newSection;
    setMenu(JSON.parse(JSON.stringify(prevSection)));
  };

  const onSetList = (newState) => {
    console.log(newState);
    if (newState) {
      let newMenu = newState.map((menu, index) => {
        menu.id = index;
        menu.type = 'container';
        menu.children &&
          menu.children.length > 0 &&
          menu.children.map((subMenu, subMenuIndex) => {
            subMenu.id = subMenuIndex;
            subMenu.type = 'text';
            subMenu.parent_id = index;
            return subMenu;
          });
        return menu;
      });
      setMenu(newMenu);
    }
  };

  return (
    <div>
      <ReactSortable list={menu} setList={setMenu} {...sortableOptions}>
        {menu.map((block, blockIndex) => (
          <BlockWrapper
            key={block.id}
            block={block}
            blockIndex={[blockIndex]}
            setMenu={setMenu}
            onChange={onChange}
            onShowItem={onShowItem}
            onChange={onChange}
          />
        ))}
      </ReactSortable>
    </div>
  );
}
function SubContainer({ block, blockIndex, setMenu, onChange }) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setMenu((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]['children'],
              tempList
            );
            lastArr[lastIndex]['children'] = currentList;
            console.log(tempList);
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setMenu={setMenu}
                onChange={onChange}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}
function BlockWrapper({ block, blockIndex, setMenu, onShowItem, onChange }) {
  console.log(block);
  if (!block) return null;
  if (block.module_name === 'container') {
    return (
      <div className="relative mb-2 cursor-move	 ">
        <div className="flex justify-between border rounded-md px-2 py-2 mb-2">
          <div className="flex">
            <ViewGridIcon className="text-current w-5" fill="gray" />
            <input
              id="content"
              name="content"
              type="text"
              onChange={(e) => onChange(e, blockIndex)}
              value={block.content}
              className="appearance-none block w-full  border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent focus:border-0 sm:text-sm"
            />
          </div>
          {block.showItem ? (
            <ChevronDownIcon
              className="text-current w-5"
              fill="gray"
              onClick={() => onShowItem(blockIndex)}
            />
          ) : (
            <ChevronRightIcon
              className="text-current w-5"
              fill="gray"
              onClick={() => onShowItem(blockIndex)}
            />
          )}
        </div>
        <SubContainer
          block={block}
          setMenu={setMenu}
          blockIndex={blockIndex}
          onChange={onChange}
        />
      </div>
    );
  } else {
    return (
      <div
        className="ml-10 border border-gray-300 rounded-md shadow-sm mb-2 px-2 py-2"
        style={Object.assign({})}
      >
        <div className="flex ">
          <ViewGridIcon className="text-current w-5" fill="gray" />
          <input
            id="module_name"
            name="module_name"
            type="text"
            
            onChange={onChange}
            value={block.content}
            className="appearance-none block w-full  border-0 placeholder-gray-400 focus:outline-none focus:ring-transparent focus:border-0 sm:text-sm"
          />
        </div>
      </div>
    );
  }
}
