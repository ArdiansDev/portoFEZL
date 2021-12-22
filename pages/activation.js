import { useResendActivation } from "hooks/auth/useResendActivation";
import { useEffect, useState } from "react";
import ModalSuccessAuth from "components/ModalSuccessAuth";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

export default function Login() {

  const router = useRouter();
  if (!router.isReady) return null;  

  const { permission, tenant } = useAuth();
  if(!permission["activate_account"]) return <div>You are not allowed to enter this page</div>

  const { isLoading, isSuccess, error, mutate } = useResendActivation();
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const {email} = event.target.elements
    let data = {email: email.value}
    mutate(data);
  } 

  useEffect(() => {
    if(isSuccess){
      setOpenSuccessResendActivation(true)
    }
  }, [isLoading])

  const [openSuccessResendActivation, setOpenSuccessResendActivation] = useState(false)

  return (
    <div className="min-h-screen bg-white flex">
       <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src={tenant?.imageLogoUrl}
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{locale("Resend Activation")}</h2>
          </div>
          <p className={`text-gray-500 reg-16`}>{locale("Please enter registered email address")}</p>
          <p className={`${error ? "visible": "invisible"} text-red-500 reg-16`}>{locale("Please enter the correct email address")}</p>
          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6"  onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {locale("Email address")}
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
                    className={`${error ? "animate-shake" : ""} w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500`}
                  >
                    {isLoading && <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    {locale("Resend Activation")}
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
                onClick={()=> router.push('/login')}
                type="button"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
             >
                {locale("Log in")}
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSuccessAuth title={"Successfully Resend Activation"} description={"Please check your email for instruction to activate your account"} open={openSuccessResendActivation} setOpen={setOpenSuccessResendActivation}/>
    </div>
  )
}

Login.getLayout = (page) =>page
Login.getHeader = () => <></>