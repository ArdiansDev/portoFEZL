import { useRequestForgotPassword } from 'hooks/auth/useForgotPassword';
import { useEffect, useState } from 'react';
import ModalSuccessAuth from 'components/ModalSuccessAuth';
import { locale } from 'utils/locale';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import NextImage from 'components/NextImage';
import Head from 'next/head';

export default function ForgotPassword() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { permission, tenant } = useAuth();
  if (!permission['forgot_password'])
    return <div>You are not allowed to enter this page</div>;
  const { isLoading, isSuccess, error, mutate } = useRequestForgotPassword();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    let data = { email: email.value };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccessResetPassword(true);
    }
  }, [isLoading]);

  const [openSuccessResetPassword, setOpenSuccessResetPassword] =
    useState(false);

  return (
    <div className="min-h-screen bg-white flex">
     
        {tenant?.coverImageUrl && tenant?.coverImageUrl !== "/missing.png" ? (
           <div className="hidden lg:block relative w-0 flex-1">
              <div>
                <div className="absolute text-center z-10 w-full flex flex-col justify-center h-full items-center text-white font-bold med-38">
                  <h1 className="mb-10 mx-12">
                    {tenant?.subdomain?.includes('uob') && locale("Be one of the first 50 users to Log-On & Earn this unique badge Today")} {' '}
                  </h1>
                  {tenant?.badgesCover && <img src={tenant?.badgesCover} />}
                </div>
                <NextImage
                  className="absolute inset-0 h-full w-full object-cover object-left"
                  src={tenant?.coverImageUrl}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </div>
        ) : (
          <div className="bg-blue-900 w-full mobile:hidden"></div>
        )}
         
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src={tenant?.imageLogoUrl}
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {locale('Forgot Password')}
            </h2>
          </div>
          <p className={`text-gray-500 reg-16`}>
            {locale('Please enter registered email address')}
          </p>
          <p
            className={`${error ? 'visible' : 'invisible'} text-red-500 reg-16`}
          >
            {error?.response?.data?.errors?.[0]?.message}
          </p>
          <div className="mt-8">
            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Email address')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`${
                      error ? 'animate-shake' : ''
                    } w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                  >
                    {isLoading && (
                      <svg
                        className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {locale('Continue')}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="mt-6 w-full">
                  <button
                    onClick={() => router.push('/login')}
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                  >
                    {locale('Log in')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSuccessAuth
        title={'Successfully Request Reset password'}
        description={
          'Please check your email for instruction to reset your password'
        }
        open={openSuccessResetPassword}
        setOpen={setOpenSuccessResetPassword}
      />
    </div>
  );
}

ForgotPassword.getLayout = (page) => page;
ForgotPassword.getHeader = () => <></>;
ForgotPassword.protectedRoute = false;
