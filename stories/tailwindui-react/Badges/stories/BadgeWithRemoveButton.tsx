/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <>
      <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-base-100 text-base-700">
        Small
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-base-400 hover:bg-base-200 hover:text-base-500 focus:outline-none focus:bg-base-500 focus:text-white"
        >
          <span className="sr-only">Remove small option</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      </span>
      <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-base-100 text-base-700">
        Large
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-base-400 hover:bg-base-200 hover:text-base-500 focus:outline-none focus:bg-base-500 focus:text-white"
        >
          <span className="sr-only">Remove large option</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      </span>
    </>
  )
}
