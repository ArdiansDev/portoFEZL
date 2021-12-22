// import { Disclosure, Menu, Transition } from '@headlessui/react';

import React from 'react';

import { useAuth } from 'context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function HeaderTop50() {
  const { tenant } = useAuth();

  const router = useRouter();

  if (!router.isReady) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <Head>
        <title>{tenant?.name}</title>
        <link rel="icon" href={tenant?.faviconUrl} />
      </Head>

      <>
        <div className="w-max-w ml-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
