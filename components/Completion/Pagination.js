/* This example requires Tailwind CSS v2.0+ */
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { locale } from 'utils/locale';

export default function Pagination({ pagination, className }) {
  const pages = [];

  for (let i = 0; i < pagination.size; i++) {
    const pageItem = pagination.getPageItem(i);

    if(pageItem.page === 'previous' || pageItem.page === 'next') continue;

    pages.push(
      <>
        {pageItem.page === 'gap' ? (
          <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
            ...
          </span>
        ) : pageItem.current ? (
          <a
            key={i}
            href="#"
            aria-current="page"
            className="border-base-500 text-base-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            onClick={(e) => {
              e.preventDefault();
              pagination.goTo(pageItem.page);
            }}
          >
            {pageItem.page}
          </a>
        ) : pageItem.page !== 'previous' && pageItem.page !== 'next' ? (
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            onClick={(e) => {
              e.preventDefault();
              pagination.goTo(pageItem.page);
            }}
          >
            {pageItem.page}
          </a>
        ) : <></>}
      </>
    );
  }

  const previous = pagination.getPageItem('previous');
  const next = pagination.getPageItem('next');

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
       <div className="-mt-px w-0 flex-1 flex">
          <button
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:bg-transparent disabled:text-gray-300"
            onClick={() => pagination.previous()}
            disabled={previous?.props?.disabled}
          >
            <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-current" aria-hidden="true" />
            {locale('Previous')}
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {pages}
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <button
            href="#"
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:bg-transparent disabled:text-gray-300"
            onClick={() => pagination.next()}
            disabled={next?.props?.disabled}
          >
            {locale('Next')}
            <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-current" aria-hidden="true" />
          </button>
        </div>
    </nav>
  )
}