import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  PuzzleIcon,
  GiftIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import ModalSwitchRole from 'components/ModalSwitchRole';
import router from 'next/router';
import NextImage from 'components/NextImage';
import { BookmarkIcon } from '@heroicons/react/outline';
import ModalChangePassword from 'components/ModalChangePassword';
import ModalSuccessAuth from 'components/ModalSuccessAuth';
import { useAuth } from 'context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MainHeader() {
  const { tenant, user, auth, permission } = useAuth();

  const router = useRouter();
  const { journey_id, event_batch_id } = router.query;
  if (!router.isReady) return null;

  const [openSwitchRole, setOpenSwitchRole] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openSuccessChangePassword, setOpenSuccessChangePassword] =
    useState(false);
  const DigitalCampus = tenant.subdomain.includes('abc') ? true : false;

  let navigation = [
    {
      name: 'Home',
      href: '/home',
      current: true,
      icon: HomeIcon,
      show: permission['view_home'],
    },
    {
      name: 'Challenge',
      href: '/profile?tab=challenge',
      current: false,
      icon: PuzzleIcon,
      show: permission['view_challenges'],
    },

    {
      name: 'Rewards',
      href: '/profile?tab=rewards',
      current: false,
      icon: GiftIcon,
      show: permission['view_rewards'],
    },
    {
      name: 'Digital Campus',
      href: 'https://stage.abcdigitalcampus.com/',
      current: false,
      icon: BookmarkIcon,
      show: DigitalCampus,
    },
  ];

  const switchRole = () => {
    setOpenSwitchRole(true);
  };

  const changePassword = () => {
    setOpenChangePassword(true);
  };

  const logout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

  const userNavigation = [
    { name: 'My Profile', href: '/profile', show: permission['view_profile'] },
    {
      name: 'Switch Role',
      onClick: switchRole,
      href: '#',
      show: permission['switch_role'],
    },
    {
      name: 'Change Password',
      onClick: changePassword,
      href: '#',
      show: permission['change_password'],
    },
    { name: 'Logout', onClick: logout, href: '#', show: true },
  ];

  let back = true;

  if (
    location.pathname === '/home' ||
    location.pathname === '/profile?tab=challenge' ||
    location.pathname === '/rewards'
  ) {
    back = false;
  }

  let backUrl = '/home';
  if (event_batch_id) {
    backUrl = `/journey/${journey_id}`;
  }

  let pathname = location.pathname;

  if (pathname.includes('survey')) {
    pathname = 'Survey';
  } else if (pathname.includes('journeys')) {
    pathname = 'Journeys';
  } else if (pathname.includes('quiz')) {
    pathname = 'Quiz';
  } else if (pathname.includes('media')) {
    pathname = 'Media';
  } else if (pathname.includes('task')) {
    pathname = 'Task';
  } else if (pathname.includes('webinar')) {
    pathname = 'Webinar';
  } else if (pathname.includes('workshop')) {
    pathname = 'Workshop';
  } else if (pathname.includes('link')) {
    pathname = 'Link';
  } else if (pathname.includes('journey')) {
    pathname = 'Journey';
  } else if (pathname.includes('badge')) {
    pathname = 'Badges';
  } else if (pathname.includes('resources')) {
    pathname = 'Resources';
  } else if (pathname.includes('profile')) {
    pathname = 'Profile';
  } else if (pathname.includes('resource')) {
    pathname = 'Resource';
  } else if (pathname.includes('permission')) {
    pathname = 'Permission';
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <Head>
        <title>{tenant?.name}</title>
        <link rel="icon" href={tenant?.faviconUrl} />
      </Head>
      <Disclosure
        as="nav"
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 "
      >
        {({ open }) => (
          <>
            <div className="w-max-w">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  {back ? (
                    <div className="flex gap-6">
                      <ArrowLeftIcon
                        className="cursor-pointer w-6 h-6 text-gray-600"
                        onClick={() => router.push(backUrl)}
                      />
                      <p className="text-gray-600 reg-16">{pathname}</p>
                    </div>
                  ) : (
                    <div
                      className="flex-shrink-0 flex items-center cursor-pointer"
                      onClick={() => router.push(tenant?.homepageRoute)}
                    >
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={tenant?.imageLogoUrl}
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={tenant?.imageLogoUrl}
                        alt="Workflow"
                      />
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation?.map((item) => {
                      if (item.show) {
                        return (
                          <Link href={item.href}>
                            <a
                              key={item.name}
                              className={classNames(
                                location.pathname + location.search ===
                                  item.href
                                  ? 'border-base-500 text-base-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium'
                              )}
                              aria-current={
                                location.pathname + location.search ===
                                item.href
                                  ? 'page'
                                  : undefined
                              }
                            >
                              <item.icon
                                className={`${
                                  location.pathname + location.search ===
                                  item.href
                                    ? 'text-base-600'
                                    : 'text-gray-500'
                                } w-5 h-5 mr-4`}
                              />
                              {item.name}
                            </a>
                          </Link>
                        );
                      }
                    })}
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500">
                      <span className="sr-only">View notifications</span>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500">
                              <span className="sr-only">Open user menu</span>
                              <div className="rounded-full   h-8 w-8">
                                {user?.img ? (
                                  <NextImage
                                    src={user?.img}
                                    alt=""
                                    width="32"
                                    height="32"
                                    // className="rounded-full"
                                  />
                                ) : (
                                  <div className="text-center bg-base-600 justify-center flex items-center h-8 w-8 text-white text-lg capitalize">
                                    {user?.name.slice(0, 1)}
                                  </div>
                                )}
                              </div>
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {userNavigation?.map((item) => {
                                if (item.show) {
                                  return (
                                    <Menu.Item key={item.name}>
                                      {({ active }) => (
                                        <Link href={item.href}>
                                          <a
                                            className={classNames(
                                              'hover:text-gray-800 hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                            )}
                                            onClick={item.onClick}
                                          >
                                            {item.name}
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  );
                                }
                              })}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation?.map((item) => {
                  if (item.show) {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-base-50 border-base-500 text-base-700'
                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                          'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    );
                  }
                })}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-base-600  h-8 w-8">
                      {user?.img ? (
                        <NextImage
                          src={user?.img}
                          alt=""
                          width="32"
                          height="32"
                          // className="rounded-full"
                        />
                      ) : (
                        <div className="text-center justify-center flex items-center h-8 w-8 text-white text-lg capitalize">
                          {user?.name.slice(0, 1)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation?.map((item) => {
                    if (item.show) {
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          onClick={item.onClick}
                        >
                          {item.name}
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <ModalSwitchRole
        user={auth}
        open={openSwitchRole}
        setOpen={setOpenSwitchRole}
      />

      <ModalChangePassword
        open={openChangePassword}
        setOpen={setOpenChangePassword}
        setModalSuccess={setOpenSuccessChangePassword}
      />

      <ModalSuccessAuth
        title={'Successfully Change password'}
        description={'In the next login, you have to login with new password'}
        open={openSuccessChangePassword}
        setOpen={setOpenSuccessChangePassword}
        withoutButton={true}
      />
    </div>
  );
}
