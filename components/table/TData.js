import React from 'react';
import moment from 'moment';
import {
  DuplicateIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import router from 'next/router';
export default function TData({ data, variant, action }) {
  /* variant user
       data = {
         img,
         name,
         email
       }
      
       variant subtitle
       data = {
         title,
         subtitle
       }

       variant tag
       data = {
         title
       }

       variant data
       data = {
         title
       }

       variant action
       data = {
         title,
         onClick
       }

       variant custom
       data = { 
         children
       }
    */

  if (variant === 'user') {
    return (
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {data?.img && (
            <div className="mr-4 flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-full" src={data?.img} alt="" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{data.name}</div>
            <div className="text-sm text-gray-500">{data.email}</div>
          </div>
        </div>
      </td>
    );
  }

  if (variant === 'subtitle') {
    return (
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{data.title || '-'}</div>
        <div className="text-sm text-gray-500">{data.subtitle}</div>
      </td>
    );
  }

  if (variant === 'tag') {
    return (
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {data.title}
        </span>
      </td>
    );
  }

  if (variant === 'data') {
    return (
      <td className="px-6 py-4 mobile:px-3 mobile:py-2 capitalize whitespace-nowrap text-sm text-gray-500">
        {data.title || '-'}
      </td>
    );
  }

  if (variant === 'custom') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {data.children}
      </td>
    );
  }

  if (variant === 'action') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button>
          <PencilAltIcon className="width-15 height-15" />
        </button>
        <button>
          <DuplicateIcon className="width-15 height-15" />
        </button>
        <button>
          <TrashIcon className="width-15 height-15" />
        </button>
      </td>
    );
  }
  if (variant === 'userAction') {
    return (
      <td className="px-6 pt-7 whitespace-nowrap   text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button>
          <EmojiHappyIcon className="width-15 height-15" />
        </button>
        <button>
          <DuplicateIcon className="width-15 height-15" />
        </button>
        <button>
          <TrashIcon className="width-15 height-15" />
        </button>
      </td>
    );
  }
  if (variant === 'journeyAction') {
    return (
      <td className="px-6 py-4 whitespace-nowrap   text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Assign
            </span>
            <UserAddIcon
              className="width-15 height-15"
              onClick={() => {
                action(data.title);
              }}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Edit
            </span>
            <PencilAltIcon
              className="width-15 height-15"
              onClick={() => data.onEditJourney()}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Duplicate
            </span>
            <DuplicateIcon
              className="width-15 height-15"
              onClick={() => data.onDuplicateJourney()}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Delete
            </span>
            <TrashIcon
              className="width-15 height-15"
              onClick={() => data.onDeleteJourney()}
            />
          </div>
        </button>
      </td>
    );
  }
  if (variant === 'journeyAction2') {
    return (
      <td className="px-6 py-4 whitespace-nowrap   text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Assigned Users
            </span>
            <UsersIcon
              className="width-15 height-15"
              onClick={() => {
                data.goToAssign();
              }}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Edit
            </span>
            <PencilAltIcon
              className="width-15 height-15"
              onClick={() => data.onEditJourney()}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Duplicate
            </span>
            <DuplicateIcon
              className="width-15 height-15"
              onClick={() => data.onDuplicateJourney()}
            />
          </div>
        </button>
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Delete
            </span>
            <TrashIcon
              className="width-15 height-15"
              onClick={() => data.onDeleteJourney()}
            />
          </div>
        </button>
      </td>
    );
  }
  if (variant === 'deleteAction') {
    return (
      <td className="px-10 py-4 whitespace-nowrap   text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button>
          <div class="has-tooltip">
            <span class="tooltip mobile:hidden max-width-211 rounded shadow-lg py-1.5 px-2.5 bg-gray-500 text-white -mt-10  reg-12">
              Edit
            </span>
            <TrashIcon
              className="width-15 height-15"
              onClick={() => data.onClick()}
            />
          </div>
        </button>
      </td>
    );
  }
  if (variant === 'time') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {data.title ? (
          moment(data.title).format('D MMM YYYY, hh:mm:ss A')
        ) : (
          <p>-</p>
        )}
      </td>
    );
  }
  if (variant === 'dataBold') {
    return (
      <td className="px-6 py-4 whitespace-nowrap font-semi-bold text-sm text-black">
        {data.status === 'unready' ? '-' : data.title}
      </td>
    );
  }
  if (variant === 'titleAction') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {data.fileUrl ? (
          <a href={data.fileUrl} target="_blank">
            {data.title}
          </a>
        ) : (
          <p>{data.title}</p>
        )}
      </td>
    );
  }
  if (variant === 'download') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
        <p
          onClick={() => {
            data.downloadLogs(data);
          }}
          className={
            data.status === 'downloaded'
              ? 'text-indigo-600 hover:text-indigo-900 visited:text-indigo-900 hover:underline'
              : ''
          }
        >
          {data.status === 'downloaded' ? 'Download' : 'Waiting'}
        </p>
      </td>
    );
  }
  if (variant === 'status') {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
        {data.title === 'unready' ? 'unready' : 'completed'}
      </td>
    );
  }
  if (variant === 'userStatus') {
    return (
      <td className="pl-3 py-4 w-max whitespace-nowrap reg-12 text-center text-gray-900 capitalize">
        {data.title === 'Active' ? (
          <p className=" bg-green-300 px-4 w-max rounded-full">Active</p>
        ) : (
          <p className=" bg-red-300 px-4 w-max rounded-full">Inactive</p>
        )}
      </td>
    );
  }
  if (variant === 'dataNumeric') {
    return (
      <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
        {data.title || '0'}
      </td>
    );
  }
  if (variant === 'select') {
    return (
      <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500 ">
        <input className="cursor-pointer" type="checkbox" />
      </td>
    );
  }
  if (variant === 'resourceAction') {
    return (
      <td className="px-6 py-4 whitespace-nowrap items-center text-gray-400 text-right text-sm font-medium gap-2 flex">
        <button onClick={()=>data.onClick()}>
          <TrashIcon className="width-15 height-15" />
        </button>
      </td>
    );
  }
}
