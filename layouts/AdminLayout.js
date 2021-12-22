/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import router, { Router } from 'next/router';

import {
  ArchiveIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  CogIcon,
  FingerPrintIcon,
  GiftIcon,
  PuzzleIcon,
  TagIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, tenant, auth } = useAuth();
  const router = useRouter();

  const [navigation, setNavigation] = useState([
    // {
    //   name: "Approval Requests",
    //   href: "#",
    //   icon: ClipboardCheckIcon,
    //   current: true,
    //   count: 5
    // },
    {
      name: 'Journeys',
      href: '/admin/journey',
      icon: ArchiveIcon,
      current: false,
    },
    {
      name: 'Items',
      href: '#',
      icon: ViewGridIcon,
      current: false,
      children: [
        // { name: 'Quizess', href: '/admin/quiz' },
        // { name: 'Survey', href: '/admin/survey' },
        // { name: 'Media', href: '/admin/media' },
        // { name: 'Link', href: '/admin/link' },
        { name: 'Resources', href: '/admin/resource' },
      ],
    },
    // { name: "Categories", href: "#", icon: TagIcon, current: false },
    // { name: "Rewards", href: "/rewards", icon: GiftIcon, current: false },
    // { name: "Gamification", href: "#", icon: PuzzleIcon, current: false },
    // {
    //   name: 'User Roles',
    //   href: '/admin/user-roles',
    //   icon: UserGroupIcon,
    //   current: false,
    // },
    // {
    //   name: "Digital Attendance",
    //   href: "#",
    //   icon: FingerPrintIcon,
    //   current: false,
    // },
    // {
    //   name: "Settings",
    //   href: "#",
    //   icon: CogIcon,
    //   current: false,
    //   children: [
    //     { name: "Permissions", href: "#" },
    //     { name: "Tenant Settings", href: "#" },
    //   ],
    // },
    {
      name: 'LE Usage',
      href: '/admin/usage-completion',
      icon: ClipboardCheckIcon,
      current: true,
    },
  ]);

  const changeNavigation = (index, url) => {
    let currentNavigation = [...navigation];
    currentNavigation = currentNavigation.map((navigation, indexNav) => {
      if (indexNav === index) {
        navigation.current = true;
      } else {
        navigation.current = false;
      }
      return navigation;
    });
    router.push(url);
    setNavigation(currentNavigation);
  };

  const logout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 justify-center flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={tenant.imageLogoUrl}
                      alt="Workflow"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item, index) =>
                      !item.children ? (
                        <div
                          key={item.name}
                          className="cursor-pointer"
                          onClick={() => changeNavigation(index, item.href)}
                        >
                          <a
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                            {item.count ? (
                              <span
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900'
                                    : 'bg-gray-900 group-hover:bg-gray-200',
                                  'ml-7 inline-block py-0.5 px-3 text-xs font-medium rounded-full text-white'
                                )}
                              >
                                {item.count}
                              </span>
                            ) : null}
                          </a>
                        </div>
                      ) : (
                        <Disclosure
                          as="div"
                          key={item.name}
                          className="space-y-1"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                  'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                )}
                              >
                                <item.icon
                                  className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span
                                  className="flex-1"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    changeNavigation(index, item.href)
                                  }
                                >
                                  {item.name}
                                </span>
                                <svg
                                  className={classNames(
                                    open
                                      ? 'text-gray-400 rotate-90'
                                      : 'text-gray-300',
                                    'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {item.children.map((subItem) => (
                                  <a
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                  >
                                    {subItem.name}
                                  </a>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src={tenant.imageLogoUrl}
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {/* User account dropdown */}
                <Menu
                  as="div"
                  className="mb-5 w-full relative inline-block text-left"
                >
                  <div>
                    <Menu.Button className="group w-full bg-transparent rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                      <span className="flex w-full justify-between items-center">
                        <span className="flex min-w-0 items-center justify-between space-x-3">
                          <img
                            className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                            src={user.img}
                            alt=""
                          />
                          <span className="flex-1 flex flex-col min-w-0">
                            <span className="text-gray-900 text-sm font-medium truncate">
                              {user.name}
                            </span>
                            <span className="text-gray-500 text-sm truncate">
                              {user.role}
                            </span>
                          </span>
                        </span>
                        <ChevronDownIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
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
                    <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                              onClick={() => router.push(tenant.homepageRoute)}
                            >
                              Switch to Learner
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                              onClick={() => router.push(auth.adminRedirectUrl)}
                            >
                              Switch to 3.0 Admin
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 cursor-pointer text-red-700'
                                  : 'text-red-500',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => logout()}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {navigation.map((item, index) =>
                  !item.children ? (
                    <div
                      key={item.name}
                      className="cursor-pointer"
                      onClick={() => changeNavigation(index, item.href)}
                    >
                      <a
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.count ? (
                          <span
                            className={classNames(
                              item.current
                                ? 'bg-gray-900'
                                : 'bg-gray-900 group-hover:bg-gray-200',
                              'ml-7 inline-block py-0.5 px-3 text-xs font-medium rounded-full text-white'
                            )}
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </a>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            )}
                          >
                            <item.icon
                              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span
                              className="flex-1 cursor-pointer"
                              onClick={() => changeNavigation(index, item.href)}
                            >
                              {item.name}
                            </span>
                            <svg
                              className={classNames(
                                open
                                  ? 'text-gray-400 rotate-90'
                                  : 'text-gray-300',
                                'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <a
                                key={subItem.name}
                                onClick={() =>
                                  changeNavigation(index, subItem.href)
                                }
                                className=" cursor-pointer group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            {/* <div className=" mx-auto px-4 sm:px-6 md:px-8 height-70 flex items-center">
              {location?.pathname?.includes('log') && (
                <ArrowLeftIcon
                  className="h-5 w-5 mr-5 cursor-pointer"
                  onClick={() => router.push('/admin/usage-completion')}
                />
              )}
              <h1 className="text-xl font-medium leading-7 text-black">
                {location?.pathname.includes('completion')
                  ? 'LE Usage'
                  : location?.pathname?.includes('log')
                  ? 'Download Logs'
                  : location?.pathname?.includes('link')
                  ? 'Link'
                  : location?.pathname?.includes('media')
                  ? 'Media'
                  : location?.pathname?.includes('quiz')
                  ? 'Quiz'
                  : location?.pathname?.includes('survey')
                  ? 'Survey'
                  : location?.pathname?.includes('journey')
                  ? 'Journey'
                  : location?.pathname?.includes('user-roles')
                  ? 'User Roles'
                  : 'Resource'}
              </h1>
            </div> */}
            <div className=" mx-auto px-4 sm:px-6 md:px-8 pb-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
