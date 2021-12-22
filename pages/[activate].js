import { useSignIn } from 'hooks/auth/useSignIn';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DropdownDept from 'components/DropdownDept';
import DropdownPostions from 'components/DropdownPostions';
import { useActivate, useAccount_creation } from 'hooks/auth/useActivation';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';
import NextImage from 'components/NextImage';

export default function Activate() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['activate_account'])
    return <div>You are not allowed to enter this page</div>;

  const query = location.search;
  const token = new URLSearchParams(query).get('token');
  const { isLoading, isSuccess, error, mutate } = useSignIn();

  useEffect(() => {
    if (isSuccess) {
      router.push(`/profiling/page/1`);
    }
    mutasi(token);
  }, [isLoading]);

  const { mutate: mutasi, data, isSuccess: berhasil } = useActivate();
  const {
    mutate: activating,
    isSuccess: activatedsucess,
    error: errors,
  } = useAccount_creation();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [OTP, setOTP] = useState('');
  useEffect(() => {
    if (berhasil) {
      setFName(data.data.membership.firstName);
      setLName(data.data.membership.lastName);
      setEmail(data.data.email);
      setDepartmentName(data.data.departmentName);
      setPositionName(data.data.positionName);
    } else {
      setDepartmentName('Department');
      setPositionName('Position');
    }
  }, [berhasil]);
  const payload = {
    password: password,
    password_confirmation: passwordConfirmation,
    token: token,
    otp_code_token: OTP,
  };

  const handleActivating = (event) => {
    event.preventDefault();
    activating(payload);
    // window.location.open('/login');
  };

  useEffect(() => {
    if (activatedsucess) {
      router.push(`/login`);
    }
  }, [activatedsucess]);
  return (
    <div className="min-h-screen bg-white flex">
      {tenant?.coverImageUrl && tenant?.coverImageUrl !== "/missing.png" ? (
        <NextImage
          className="absolute inset-0 h-full w-full object-cover object-left"
          src={tenant?.coverImageUrl}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      ) : (
        <div className="bg-blue-900 w-full mobile:hidden"></div>
      )}
      <div className="flex-1 flex flex-col  py-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className=" text-3xl font-extrabold text-gray-900">
              {locale('Registration Details')}
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form
                action={handleActivating}
                // method="GET"
                onSubmit={handleActivating}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('First Name*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      // id="firstName"
                      // name="firstName"
                      type="text"
                      autoComplete="firstName"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Last Name*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      // id="LastName"
                      // name="LastName"
                      type="text"
                      autoComplete="LastName"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Email Address*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Departments*')}
                  </label>
                  <div className="mt-1">
                    <DropdownDept
                      value={departmentName}
                      setDepartmentName={setDepartmentName}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Positions*')}
                  </label>
                  <div className="mt-1">
                    <DropdownPostions
                      value={positionName}
                      setPositionName={setPositionName}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Password*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // id="password"
                      // name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('Confirm Password*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      // id="Repassword"
                      // name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="OTP"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {locale('OTP Code*')}
                  </label>
                  <div className="mt-1">
                    <input
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      // id="OTP"
                      // name="OTP"
                      type="OTP"
                      autoComplete="OTP"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-base-500 focus:border-base-500 sm:text-sm"
                    />
                  </div>
                  {permission['resend_otp'] && (
                    <h2 className="text-blue-800 text-sm text-right cursor-pointer mt-4">
                      {locale('Resend OTP')}
                    </h2>
                  )}
                </div>
                <p
                  className={`${
                    errors ? 'visible' : 'hidden'
                  } text-red-500 reg-16`}
                >
                  Please input the correct OTP or password
                </p>
                <div>
                  <button
                    type="submit"
                    className={`${
                      errors ? 'animate-shake' : ''
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
                    {locale('Activate Your Account')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Activate.getLayout = (page) => page;
Activate.getHeader = () => <></>;
Activate.protectedRoute = false;
