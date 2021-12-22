import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import { UploadIcon } from '@heroicons/react/outline';
import Table from 'components/admin/Table';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import ModalUploadFile from 'components/ModalUploadMultipleTable';
import { useCategories } from 'hooks/categories/useCategories';
import { useAdminJourney, useDeletejourney } from 'hooks/journeys/useJourneys';
import ModalSuccesUpload from 'components/ModalSuccesUpload';
import ModalWarningDelete from 'components/admin/ModalWarningDelete';
import { PlusIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';

export default function Journey() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { query } = router || {};

  const config = [
    {
      title: 'Categories',
      submenu: [],
    },
  ];

  const filterData = {
    categoryIds: [],
    subCategoryIds: [],
  };
  const initialMenuFilter = Object.freeze(config);
  const initialFilter = Object.freeze(filterData);
  const [formData, updateFormData] = useState(initialMenuFilter);
  const [queryData, setQuery] = useState(initialFilter);
  const [categoriesData, setUpdateCatoriesData] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadNotif, setUploadNotif] = useState(false);
  const [statusAndRemarks, setStatusAndRemarks] = useState();
  const [pendingUpload, setPendingUpload] = useState();
  const [openModalDeleteJourney, setOpenModalDeleteJourney] = useState(false);
  const [journeyId, setJourneyId] = useState();
  const [tab, setTab] = useState(query.tab === 'assigned' ? true : false);
  const [savedCheck, setSavedCheck] = useState(query.saved);

  useEffect(() => {
    setTimeout(() => {
      setSavedCheck(false);
    }, 10000);
  }, [savedCheck]);
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  const convertCategories = (categories) => {
    const newCategories = categories.map((category) => {
      const submenu = category.subCategories?.map((subCategory) => {
        return { id: subCategory.id, title: subCategory.name };
      });

      submenu.unshift({
        id: undefined,
        title: `All Categories`,
      });

      return {
        id: category.id,
        title: category.name,
        submenu,
      };
    });

    newCategories.unshift({
      id: undefined,
      title: 'All Categories',
      selected: true,
    });

    setUpdateCatoriesData(JSON.parse(JSON.stringify(newCategories)));
  };

  const { data: categories } = useCategories({
    options: { onSuccess: (data) => convertCategories(data) },
  });

  useEffect(() => {
    let newConfig = formData;
    if (categories) {
      newConfig = newConfig.map((config) => {
        if (config.title === 'Categories') {
          return {
            title: 'Categories',
            submenu: JSON.parse(JSON.stringify(categoriesData)),
          };
        } else return config;
      });
    }

    updateFormData(newConfig);
  }, [categoriesData]);

  const reshapeQueryData = (formData) => {
    let categoriesSubMenu = formData.find(
      ({ title }) => title === 'Categories'
    ).submenu;

    let subCategoryMenu = [];
    let categoryMenu = [];
    categoriesSubMenu.map((menu, i) => {
      if (menu.submenu && menu.submenu.length > 1) {
        menu.submenu.map((submenu, j) => {
          if (submenu.selected && j != 0) subCategoryMenu.push(submenu.id);
          if (menu.submenu[0].selected) subCategoryMenu.push(submenu.id);
        });
      } else {
        if (menu.selected && i != 0) categoryMenu.push(menu.id);
      }
    });

    let newQueryData = {
      ...queryData,
      subCategoryIds: subCategoryMenu,
      categoryIds: categoryMenu,
    };

    setQuery(newQueryData);
  };

  const firstRender = useRef();

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
    } else {
      reshapeQueryData(formData);
      pagination.goTo(1);
    }
  }, [formData]);

  const pagination = usePagination({
    page: 1,
    itemsPerPage: 10,
    maxPageItems: 9,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const {
    data: journeys,
    isLoading,
    refetch: refetchJourneys,
  } = useAdminJourney({
    query: {
      ...queryData,
      assigned: tab,
      all: true,
      page,
      perPage: 10,
    },
  });

  useEffect(() => {
    if (journeys?.data) {
      let totalPages = journeys?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [journeys]);

  const onSearch = (e) => {
    let newFilter = { ...queryData, ['q']: e.target.value };
    setQuery(newFilter);
  };

  const onRefresh = () => {
    const config = [
      {
        title: 'Categories',
        submenu: categoriesData,
      },
    ];
    updateFormData(JSON.parse(JSON.stringify(config)));
  };

  const { mutate: deleteJourney } = useDeletejourney({
    options: {
      onSettled: () => {
        refetchJourneys();
      },
    },
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (isLoading) return null;
  const handleAssign = (id) => {
    setUploadModal(true);
    setJourneyId(id);
  };

  const tbody = journeys?.data?.map((data) => ({
    key: data.id,
    tdata: [
      { variant: 'data', data: { title: data['title'] } },
      {
        variant: 'dataNumeric',
        data: { title: data.items.length + ' items' },
      },

      {
        variant: 'journeyAction',
        data: {
          title: data['id'],
          onDeleteJourney: () => {
            setOpenModalDeleteJourney(true);
            setJourneyId(data.id);
          },
          onEditJourney: () => {
            router.push(`/admin/journey/edit/${data['id']}`);
          },
          onDuplicateJourney: () => {
            router.push(`/admin/journey/duplicate/${data['id']}`);
          },
          goToAssign: () => {
            router.push(`/admin/journey/assign/${data['id']}`);
          },
        },
        action: handleAssign,
      },
    ],
  }));
  const tbody2 = journeys?.data?.map((data) => ({
    key: data.id,
    tdata: [
      { variant: 'data', data: { title: data['title'] } },
      {
        variant: 'dataNumeric',
        data: { title: data.items.length + ' items' },
      },
      {
        variant: 'dataNumeric',
        data: { title: data['totalUsers'] + ' Users' },
      },
      {
        variant: 'journeyAction2',
        data: {
          title: data['id'],
          onDeleteJourney: () => {
            setOpenModalDeleteJourney(true);
            setJourneyId(data.id);
          },
          onEditJourney: () => {
            router.push(`/admin/journey/edit/${data['id']}`);
          },
          onDuplicateJourney: () => {
            router.push(`/admin/journey/duplicate/${data['id']}`);
          },
          goToAssign: () => {
            router.push(`/admin/journey/assign/${data['id']}`);
          },
        },
        action: handleAssign,
      },
    ],
  }));

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <div className="flex mt-6 justify-between">
          <h1 className="text-xl  font-medium leading-7 text-black">
            Journeys
          </h1>{' '}
          <div className="flex gap-2 5">
            <button
              class="width-195 height-35 inline-flex justify-center items-center border border-gray-300 shadow-sm text-normal font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
              onClick={() => {
                router.push('/admin/journey/add');
              }}
            >
              <PlusIcon className="mobile:h-6 text-current h-7 mr-2 py-1 rounded-lg" />
              Add Journey
            </button>
            {/* <button
              class="width-195 bg-base-500 height-35 hover:bg-grey  py-2 px-4 rounded inline-flex justify-center items-center"
              onClick={() => {
                setUploadModal(true);
              }}
            >
              {pendingUpload ? (
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
                    strokeWidth="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <UploadIcon className="mobile:h-6 text-white h-7 mr-2 bg-base-500  py-1 rounded-lg" />
              )}
              <span className="text-white text-normal text-white-500">
                Bulk Upload
              </span>
            </button> */}
          </div>
        </div>
        <motion.div
          initial={false}
          animate={savedCheck ? 'open' : 'closed'}
          variants={variants}
        >
          <div className="text-lg leading-7 reg-14 flex justify-between  p-4 rounded-xl mt-4 text-green-800 bg-green-50">
            <p className="flex justify-between">
              <CheckCircleIcon className="width-16 mr-2 text-green-500" />
              All your changes has been saved.
            </p>
            <button onClick={() => setSavedCheck(false)}>
              <XIcon className="width-16 mr-2 text-green-500" />
            </button>
          </div>
        </motion.div>

        <div className="flex items-center py-5 gap-11">
          <SearchForm onSearch={onSearch} placeholder={'Search by Title'} />
        </div>
        {/* <Filter
          filterData={formData}
          changeFilterData={updateFormData}
          resetFilter={onRefresh}
        /> */}

        <div className="mb-6">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          </div>
          <div className="">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setTab(false)}
                  className={classNames(
                    !tab
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  Unassigned
                </button>
                <button
                  onClick={() => setTab(true)}
                  className={classNames(
                    tab
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  Assigned
                </button>
              </nav>
            </div>
          </div>
        </div>
        {/* <div
          className={
            'text-lg leading-7 reg-14 flex justify-between  p-4 rounded-xl' +
            (tab ? ' text-red-800 bg-red-50' : ' text-blue-800 bg-blue-50')
          }
        >
          <p className="flex">
            <InformationCircleIcon className="width-16 mr-2" />
            {tab
              ? 'You can’t edit the items in Journey after you assign to the users'
              : 'You can edit the items in Journey before you assign to the users'}
          </p>
        </div> */}
        <div className="mt-10 h-full">
          <Table
            thead={
              tab
                ? ['TITLE', 'NO OF ITEMS', 'NO OF USER', 'ACTION']
                : ['TITLE', 'NO OF ITEMS', 'ACTION']
            }
            tbody={tab ? tbody2 : tbody}
            title={tab ? 'assigned' : 'unassigned'}
          />
        </div>
        <div className="mt-7">
          {journeys?.pagination?.totalPages > 1 ? (
            <Pagination pagination={pagination} />
          ) : (
            <></>
          )}
        </div>
        {uploadNotif && (
          <ModalSuccesUpload
            Show={uploadNotif}
            setShow={setUploadNotif}
            statusAndRemarks={statusAndRemarks}
          />
        )}
      </section>

      {uploadModal && (
        <ModalUploadFile
          formData={formData}
          updateFormData={updateFormData}
          onRefresh={onRefresh}
          pagination={pagination}
          onSearch={onSearch}
          id={journeyId}
          tbody={tbody}
          setPendingUpload={setPendingUpload}
          open={uploadModal}
          setOpen={setUploadModal}
          refetch={refetchJourneys}
          setUploadNotif={setUploadNotif}
          setStatusAndRemarks={setStatusAndRemarks}
        />
      )}

      {openModalDeleteJourney && (
        <ModalWarningDelete
          open={openModalDeleteJourney}
          setOpen={setOpenModalDeleteJourney}
          title={'Delete Journey'}
          subtitle={
            "Are you sure want to delete this journey? This journey will be permanently removed, and you can't restore it. This action cannot be undone."
          }
          id={journeyId}
          primaryText={'Delete'}
          secondaryText={'Cancel'}
          onSubmit={() => deleteJourney(journeyId)}
        />
      )}
    </div>
  );
}
