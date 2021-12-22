import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import { UploadIcon } from '@heroicons/react/outline';

import Table from 'components/admin/Table';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import ModalUploadFile from 'components/ModalUploadFile';
import { useCategories } from 'hooks/categories/useCategories';
import {
  useDeleteResources,
  useDeleteResourcesCompletion,
  useResourcesAdmin as useResources,
  useResourcesCompletion,
} from 'hooks/resources/useResources';
import ModalSuccesUpload from 'components/ModalSuccesUpload';
import { useResourcesSources } from 'hooks/resources/useResourcesSources';
import ModalWarningDelete from 'components/admin/ModalWarningDelete';

export default function Resource() {
  const router = useRouter();
  if (!router.isReady) return null;
  const config = [
    {
      title: 'Categories',
      submenu: [],
    },
    {
      title: 'Sources',
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
  const [sourcesData, setUpdateSourcesData] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadNotif, setUploadNotif] = useState(false);
  const [statusAndRemarks, setStatusAndRemarks] = useState();
  const [pendingUpload, setPendingUpload] = useState();
  const [tab, setTab] = useState('resource');
  const [openModalDeleteResource, setOpenModalDeleteResource] = useState(false);
  const [
    openModalDeleteResourceCompletion,
    setOpenModalDeleteResourceCompletion,
  ] = useState(false);

  const [resourceId, setResourceId] = useState();
  const [resourceCompletionId, setResourceCompletionId] = useState();

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

  const convertSources = (sources) => {
    console.log('sources', sources);
    const newSources = sources.source.map((source, index) => {
      return { id: index, title: source };
    });

    newSources.unshift({
      id: undefined,
      title: 'All Sources',
      selected: true,
    });

    setUpdateSourcesData(JSON.parse(JSON.stringify(newSources)));
  };

  const { data: categories } = useCategories({
    options: { onSuccess: (data) => convertCategories(data) },
  });

  const { data: sources } = useResourcesSources({
    options: { onSuccess: (data) => convertSources(data) },
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

    if (sources) {
      newConfig = newConfig.map((config) => {
        if (config.title === 'Sources') {
          return {
            title: 'Sources',
            submenu: JSON.parse(JSON.stringify(sourcesData)),
          };
        } else return config;
      });
    }

    updateFormData(newConfig);
  }, [categoriesData, sourcesData]);

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

    let sourcesData = formData.find(({ title }) => title === 'Sources').submenu;

    let newQueryData = {
      ...queryData,
      subCategoryIds: subCategoryMenu,
      categoryIds: categoryMenu,
      source: sourcesData
        .map((menu) => {
          if (sourcesData[0].selected) return undefined;
          if (menu.selected) return menu.title;
        })
        .filter((menu) => menu !== undefined),
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
    data: resources,
    isLoading,
    refetch: refetchResources,
  } = useResources({
    query: {
      ...queryData,
      page,
      perPage: 10,
    },
  });
  const {
    data: resourcesCompletion,
    isLoading: completionLoading,
    refetch: completionRefetch,
  } = useResourcesCompletion({
    query: {
      ...queryData,
      page,
      perPage: 10,
    },
  });

  const { mutate: deleteResource } = useDeleteResources({
    options: {
      onSettled: () => {
        refetchResources();
      },
    },
  });

  const { mutate: deleteResourceCompletion } = useDeleteResourcesCompletion({
    options: {
      onSettled: () => {
        completionRefetch();
      },
    },
  });

  useEffect(() => {
    if (resources?.data) {
      let totalPages = resources?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [resources]);

  useEffect(() => {
    if (resourcesCompletion?.data) {
      let totalPages = resources?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [resourcesCompletion]);

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
      {
        title: 'Sources',
        submenu: sourcesData,
      },
    ];
    updateFormData(JSON.parse(JSON.stringify(config)));
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (isLoading) return null;

  const tbody = resources?.data?.map((resource) => ({
    key: resource.id,
    tdata: [
      { variant: 'data', data: { title: resource['name'] } },
      { variant: 'data', data: { title: resource['modality'] } },
      {
        variant: 'dataNumeric',
        data: { title: resource['rewardScore'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: resource['rewardCoin'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: resource['rewardGem'] },
      },
      {
        variant: 'resourceAction',
        data: {
          onClick: () => {
            setOpenModalDeleteResource(true);
            setResourceId(resource.id);
          },
        },
      },
    ],
  }));

  const tbody2 = resourcesCompletion?.data?.map((resource) => ({
    key: resource.id,
    tdata: [
      { variant: 'data', data: { title: resource.user['name'] } },
      {
        variant: 'data',
        data: { title: resource['resourceTitle'] },
      },
      { variant: 'data', data: { title: resource['source'] } },
      {
        variant: 'dataNumeric',
        data: { title: resource['scores'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: resource['coins'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: resource['gems'] },
      },
      {
        variant: 'resourceAction',
        data: {
          onClick: () => {
            setOpenModalDeleteResourceCompletion(true);
            setResourceCompletionId(resource.id);
          },
        },
      },
    ],
  }));

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <div className="flex mt-6 justify-between">
          <h1 className="text-xl my-4 font-medium leading-7 text-black">
            Resources
          </h1>
          <div className="flex gap-2 5">
            <button
              class="width-195 bg-blue-900 height-35 hover:bg-grey  py-2 px-4 rounded inline-flex justify-center items-center "
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
        </div>
        <div className="flex items-center py-5 gap-11">
          <SearchForm onSearch={onSearch} placeholder={'Search by Title'} />
        </div>
        <Filter
          filterData={formData}
          changeFilterData={updateFormData}
          resetFilter={onRefresh}
        />
        <div className="mt-10">
          <div className="mb-6">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            </div>
            <div className="mobile:w-full">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    onClick={() => setTab('resource')}
                    className={classNames(
                      tab === 'resource'
                        ? 'border-secondary text-secondary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'w-1/4 mobile:w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    Resource Listing
                  </button>
                  <button
                    onClick={() => setTab('resource-completion')}
                    className={classNames(
                      tab === 'resource-completion'
                        ? 'border-secondary text-secondary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'w-1/4 mobile:w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    Resource Completion Upload
                  </button>
                </nav>
              </div>
            </div>
          </div>
          {tab === 'resource' ? (
            <Table
              thead={['TITLE', 'SOURCE', 'SCORE', 'COINS', 'GEMS', 'ACTION']}
              tbody={tbody}
              title={'completion'}
            />
          ) : (
            <Table
              thead={[
                'NAME',
                'TITLE',
                'SOURCE',
                'SCORE',
                'COINS',
                'GEMS',
                'ACTION',
              ]}
              tbody={tbody2}
              title={'completion'}
            />
          )}
        </div>

        <div className="mt-7">
          {tab === 'resource' && resources.pagination.totalPages > 1 ? (
            <Pagination pagination={pagination} />
          ) : tab === 'resource-completion' &&
            resourcesCompletion?.pagination?.totalPages > 1 ? (
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
          refetch={tab === 'resource' ? refetchResources : completionRefetch}
          setUploadNotif={setUploadNotif}
          setStatusAndRemarks={setStatusAndRemarks}
          tab={tab}
        />
      )}

      {openModalDeleteResource && (
        <ModalWarningDelete
          open={openModalDeleteResource}
          setOpen={setOpenModalDeleteResource}
          title={'Delete Resource'}
          subtitle={
            'If you delete, the Resource will be gone forever. Are you sure you want to proceed?'
          }
          id={resourceId}
          primaryText={'Delete'}
          secondaryText={'Cancel'}
          onSubmit={() => deleteResource(resourceId)}
        />
      )}

      {openModalDeleteResourceCompletion && (
        <ModalWarningDelete
          open={openModalDeleteResourceCompletion}
          setOpen={setOpenModalDeleteResourceCompletion}
          title={'Delete Resource Completion'}
          subtitle={
            'If you delete,  the Resource completion will be gone forever. Are you sure you want to proceed?'
          }
          id={resourceCompletionId}
          primaryText={'Delete'}
          secondaryText={'Cancel'}
          onSubmit={() => deleteResourceCompletion(resourceCompletionId)}
        />
      )}
    </div>
  );
}
