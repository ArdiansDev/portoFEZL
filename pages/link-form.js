import useUser from 'hooks/auth/useUser';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import { Switch } from '@headlessui/react';
import { DropDown } from 'components/Link/Dropdown';
import Filter from 'components/Filter/Filter';

export default function LinkForm() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { query } = router || {};

  const {
    user,
    isLoading,
    data: userData,
  } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  const [tab, setTab] = useState(query.tab ?? 'profile');
  const [enabled, setEnabled] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startValue, onStartChange] = useState(false);
  const [endValue, onEndChange] = useState(false);
  const disabledStartDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = startValue;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  };

  const { permission } = useAuth();
  if (!permission['view_link'])
    return <div>You are not allowed to enter this page</div>;

  if (isLoading) return null;
  return (
    <div className="flex-col ">
      <section className="space-y-6 mobile:ml-0 mobile:mt-4 w-full ">
        <div className="bg-white shadow rounded-xl flex mobile:flex-col">
          <div className="max-width-300 p-10">
            <h1 className="text-gray-900 reg-20 mb-5">Link Details</h1>
            <p className="text-gray-500 reg-14 ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p>
          </div>
          <div className="w-full p-5">
            <div className="space-y-6 w-full shadow p-5">
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Link Title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="linkTitle"
                    name="linkTitle"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Category
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <DropDown />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Sub Category
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="linkTitle"
                    name="linkTitle"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="linkTitle"
                    name="linkTitle"
                    type="text"
                    placeholder="Link description"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-gray-500 reg-14">
                  Brief description for your link.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl flex mobile:flex-col  items-center flex mobile:flex-col	">
          <div className="max-width-300 p-10">
            <h1 className="text-gray-900 reg-20 mb-5">Link URL</h1>
            <p className="text-gray-500 reg-14 ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p>
          </div>
          <div className="w-full p-5 items-center	">
            <div className="space-y-6 w-full bg-white shadow p-5">
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Insert Link
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="linkTitle"
                    name="linkTitle"
                    type="text"
                    placeholder="www.example.com"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl flex mobile:flex-col items-center	">
          <div className="max-width-300 p-10">
            <h1 className="text-gray-900 reg-20 mb-5">Completion Criteria</h1>
            <p className="text-gray-500 reg-14 ">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque.
            </p>
          </div>
          <div className="w-full p-5 items-center	">
            <div className="space-y-6 w-full bg-white shadow p-5">
              <div className="flex justify-between item-center">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Completion Criteria
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Completion Quiz
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <DropDown />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-end">
          <button class="bg-white hover:bg-gray-100 text-gray-500 font-normal py-2 px-10 mr-4 border border-gray-400 rounded shadow">
            Cancel
          </button>
          <button class="bg-gray-500 hover:bg-gray-700 text-white font-normal py-2 px-10 border border-gray-700 rounded">
            Create
          </button>
        </div>
      </section>
    </div>
  );
}
