/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react';

import { useLocale, usePutLocale } from 'hooks/locale/useLocale';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import router, { Router } from 'next/router';

export default function Locale() {
  const [key, setKey] = useState();
  const [value, setValue] = useState();
  const [newKey, setNewKey] = useState();
  const [newValue, setNewValue] = useState();
  const { data, refetch } = useLocale();
  const locale = data.localeProperties;
  let result = Object.keys(locale).map((key) => [key, locale[key]]);
  const { mutate } = usePutLocale({ subdomain: data?.subdomain });

  const payload = {
    subdomain: data?.subdomain,
    properties: {
      [key]: value,
    },
  };
  const payload2 = {
    subdomain: data?.subdomain,
    properties: {
      [newKey]: newValue,
    },
  };
  const handleOnchange = (e) => {
    setValue(e);
  };
  const handleNewChange = (e) => {
    mutate(payload2);
    refetch();
  };
  useEffect(() => {
    if (key) {
      mutate(payload);
      console.log(payload);
    }
  }, [value]);
  useEffect(() => {
    console.log(data.localeProperties);
  }, [key]);
  return (
    <div className="mt-5">
      <h1 className="text-xl my-4 font-medium leading-7 flex gap-2 items-center text-black">
        <ArrowLeftIcon
          className="h-5 w-5 mr-5 cursor-pointer"
          onClick={() => router.push('/admin/usage-completion')}
        />{' '}
        Locale
      </h1>
      <div className="flex gap-2 p-2 rouded-lg mb-4 ">
        <input
          className="w-full  shadow outline-none px-2 rounded-lg "
          placeholder="key"
          defaultValue={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          className="w-full shadow outline-none px-2 rounded-lg "
          placeholder="value"
          defaultValue={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button
          onClick={(e) => handleNewChange(e)}
          className="width-250 bg-blue-900 height-35 hover:bg-grey  py-2 px-4 rounded inline-flex items-center text-white"
        >
          <PlusIcon className="mobile:h-6 text-current h-7 mr-2 py-1 rounded-lg" />{' '}
          New Key
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center border text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center border text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {result.map((item) => (
            <tr
              key={item[0]}
              className="text-left "
              onClick={() => {
                setKey(item[0]);
              }}
            >
              <td className="border w-1/2 p-4">{item[0]}</td>
              <td className="border w-1/2 ">
                <input
                  className="w-full focus:bg-gray-100 outline-none p-4"
                  placeholder={item[1]}
                  defaultValue={item[1]}
                  onChange={(e) => handleOnchange(e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
