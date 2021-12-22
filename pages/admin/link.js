import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import { UploadIcon } from '@heroicons/react/outline';

import Table from 'components/admin/Table';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import ModalUploadFile from 'components/ModalUploadLinks';
import { useCategories } from 'hooks/categories/useCategories';
import { useLink } from 'hooks/link/useLink';
import ModalSuccesUpload from 'components/ModalSuccesUpload';

export default function Link() {
  const router = useRouter();
  if (!router.isReady) return null;
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
    data: links,
    isLoading,
    refetch: refetchLinks,
  } = useLink({
    query: {
      ...queryData,
      page,
      perPage: 10,
    },
  });

  useEffect(() => {
    if (links?.data) {
      let totalPages = links?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [links]);

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (isLoading) return null;

  const tbody = links?.data?.map((link) => ({
    key: link.id,
    tdata: [
      { variant: 'data', data: { title: link['name'] } },
      {
        variant: 'dataNumeric',
        data: { title: link['reward_score'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: link['reward_coin'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: link['reward_gem'] },
      },
    ],
  }));

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <h1 className="text-xl my-4 font-medium leading-7 text-black">Link</h1>
        <div className="flex items-center py-5 gap-11">
          <SearchForm onSearch={onSearch} placeholder={'Search by Title'} />

          <button
            class="width-195 bg-blue-900 height-35 hover:bg-grey  py-2 px-4 rounded inline-flex items-center hidden"
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
              <UploadIcon className="mobile:h-6 text-white h-7 mr-2 bg-blue-900  py-1 rounded-lg" />
            )}
            <span className="text-white text-normal text-white-500">
              Bulk Upload
            </span>
          </button>
        </div>
        <Filter
          filterData={formData}
          changeFilterData={updateFormData}
          resetFilter={onRefresh}
        />
        <div className="mt-10">
          <Table thead={['TITLE', 'SCORE', 'COINS', 'GEMS']} tbody={tbody} />
        </div>

        <div className="mt-7">
          {links?.pagination.totalPages > 1 ? (
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
          setPendingUpload={setPendingUpload}
          open={uploadModal}
          setOpen={setUploadModal}
          refetch={refetchLinks}
          setUploadNotif={setUploadNotif}
          setStatusAndRemarks={setStatusAndRemarks}
        />
      )}
    </div>
  );
}
