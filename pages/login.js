import { useSignIn } from 'hooks/auth/useSignIn';
import { useEffect, useState } from 'react';
import { locale } from 'utils/locale';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import NextImage from 'components/NextImage';
import Head from 'next/head';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

export default function Login() {
  const [showPass, setShowPass] = useState('password');
  const router = useRouter();
  if (!router.isReady) return null;
  if (location?.pathname?.includes('logout')) localStorage.clear();
  const { isLoading, isSuccess, error, mutate, data } = useSignIn();

  const { tenant, permission } = useAuth();
  if (!permission['view_login'])
    return <div>You are not allowed to enter this page</div>;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    let data = { email: email.value, password: password.value };
    mutate(data);
  };

  const handleShowPassword = () => {
    if (showPass === 'password') {
      setShowPass('text');
    } else {
      setShowPass('password');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.authRedirectUrl) {
        window.location.assign(data?.authRedirectUrl);
      }
      // else if (data?.user?.role !== 'member') {
      //   window.location.assign(data?.adminRedirectUrl);
      // }
      else if (data?.user?.surveyId) {
        router.push(`/profiling/${data?.user?.surveyId}`);
      } else {
        router.push(tenant?.homepageRoute);
      }
    }
  }, [isLoading]);
  return (
    <div className="min-h-screen bg-white flex">
      <Head>
        <title>{tenant?.name}</title>
        <link rel="icon" href={tenant?.faviconUrl} />
      </Head>

      {tenant?.coverImageUrl && tenant?.coverImageUrl !== '/missing.png' ? (
        <div className="hidden lg:block relative w-0 flex-1">
          <div>
            <div className="absolute text-center z-10 w-full flex flex-col justify-center h-full items-center text-white font-bold ">
              {tenant?.name === 'UOB' ? (
                <h1 className="mb-10 mx-12 reg-30">
                  {tenant?.subdomain?.includes('uob') &&
                    locale('This December, you can give back as your learn.')}
                  <br />
                  <h1 className="mt-5 reg-30">
                    Use your rewards coins to make a donation, and earn double
                    rewards for eligible LinkedIn learning courses from 6-17
                    December 2021.
                  </h1>

                  <a
                    className="underline reg-24"
                    target="_blank"
                    href="http://myuob.uobnet.com/aboutuob/Our-Stories/Our-Stories-2021/Pages/SG/Dec/Make_difference_December_learn_earn_double_rewards_Singapore_211202.aspx"
                  >
                    Find Out More
                  </a>
                </h1>
              ) : (
                <h1 className="mb-10 mx-12">
                  {tenant?.subdomain?.includes('uob') &&
                    locale(
                      'Be one of the first 50 users to Log-On & Earn this unique badge Today'
                    )}{' '}
                </h1>
              )}
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
              {locale('Sign in to your account')}
            </h2>
          </div>
          <p
            className={`${error ? 'visible' : 'invisible'} text-red-500 reg-16`}
          >
            {locale('Please input the correct email or password')}
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

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Password')}
                  </label>
                  <div className="mt-1 flex justify-end items-center ">
                    <input
                      id="password"
                      name="password"
                      type={showPass}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />

                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="text-base-500 w-6 absolute z-20 mr-4 "
                    >
                      {showPass === 'password' ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {permission['reset_passsword'] && (
                  <div className="flex items-center justify-between">
                    <div className="invisible items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-base-600 focus:ring-base-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="hover:underline font-medium text-base-600 hover:text-base-500"
                        onClick={() => router.push('/forgot-password')}
                      >
                        {locale('Forgot your password?')}
                      </a>
                    </div>
                  </div>
                )}

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
                    {locale('Sign in')}
                  </button>
                </div>
              </form>
              {/* <div className="mt-6">
                {tenant?.name !== 'abc' && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <div className="mt-6 w-full items-center">
                      <button
                        onClick={() => router.push('/signup')}
                        type="button"
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                      >
                        Activate Your Account
                      </button>
                    </div>
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = (page) => page;
Login.getHeader = () => <></>;
Login.protectedRoute = false;
