import { locale } from 'utils/locale';

export default function Pagination({ pagination, className }) {
  const pages = [];

  for (let i = 0; i < pagination.size; i++) {
    const pageItem = pagination.getPageItem(i);

    pages.push(
      <li key={i}>
        {pageItem.page === 'previous' ? (
          <button
            href="#"
            className="mobile:text-xs mobile:px-2 mobile:py-1  relative inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 text-sm font-medium rounded-0 rounded-l-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300"
            onClick={() => pagination.previous()}
            disabled={pageItem?.props?.disabled}
          >
            {locale('Previous')}
          </button>
        ) : pageItem.page === 'next' ? (
          <button
            href="#"
            className="mobile:text-xs mobile:px-2 mobile:py-1 relative inline-flex items-center px-4 py-2 border border-l-0 rounded-0 rounded-r-md border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300"
            onClick={() => pagination.next()}
            disabled={pageItem?.props?.disabled}
          >
            {locale('Next')}
          </button>
        ) : pageItem.page === 'gap' ? (
          <span className="mobile:text-xs mobile:px-2 mobile:py-1 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
        ) : pageItem.current ? (
          <a
            key={i}
            href="#"
            aria-current="page"
            className="mobile:text-xs mobile:px-2 mobile:py-1 z-10 bg-base-50 border-base-500 text-base-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            onClick={(e) => {
              e.preventDefault();
              pagination.goTo(pageItem.page);
            }}
          >
            {pageItem.page}
          </a>
        ) : (
          <a
            href="#"
            className="mobile:text-xs mobile:px-2 mobile:py-1 bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            onClick={(e) => {
              e.preventDefault();
              pagination.goTo(pageItem.page);
            }}
          >
            {pageItem.page}
          </a>
        )}
      </li>
    );
  }
  return (
    <div className={`  flex items-center   ${className}`}>
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <ul className={'flex '}>{pages}</ul>
      </nav>
    </div>
  );
}
