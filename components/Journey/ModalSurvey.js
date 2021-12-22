/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import usePagination from '@lucasmogari/react-pagination';
import Pagination from 'components/Completion/Pagination';

import { SearchForm } from 'components/Completion/SearchForm';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Table from 'components/admin/Table';
import { useSurveys } from 'hooks/surveys/useSurveys';
import { useCategories } from 'hooks/categories/useCategories';
import Filter from 'components/Filter/Filter';
import router from 'next/router';

export default function ModalSurvey({ open, setOpen, data, onAddItem }) {
  const cancelButtonRef = useRef(null);
  const [surveyData, setSurveyData] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const pagination = usePagination({
    page: 1,
    itemsPerPage: 5,
    maxPageItems: 9,
    numbers: true,
    arrows: true,
  });

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

  const page = pagination?.page;

  const {
    data: surveys,
    isLoading,
    refetch: refetchQuiz,
  } = useSurveys({
    query: {
      ...queryData,
      page,
      perPage: 5,
    },
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

  const onSearch = (e) => {
    let newFilter = { ['q']: e.target.value };
    setQuery(newFilter);
  };

  useEffect(() => {
    if (surveys?.data) {
      setSurveyData(surveys);
      let totalPages = surveys?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [surveys]);

  const handleChange = (id) => {
    let prevItem = selectItem;

    let newLink = surveyData?.data.map((itm) => {
      if (itm.id == id) {
        itm.checked = itm.checked ? false : true;
      }
      return itm;
    });
    surveyData['data'] = newLink;
    var ids = new Set(newLink.map((d) => d.id));
    var merged = [...newLink, ...prevItem.filter((d) => !ids.has(d.id))];

    setSelectItem(merged);

    setSurveyData(JSON.parse(JSON.stringify(surveyData)));
  };

  const onSelect = () => {
    let selectedItem = selectItem
      .map((itm) => {
        itm.itemType = 'DataCollection';
        if (itm.checked) return itm;
      })
      .filter((itm) => itm !== undefined);

    onAddItem(selectedItem);
    setOpen(false);
  };
  const setCheckedItem = (id) => {
    let exist = selectItem.find((itm) => itm.id == id && itm.checked == true);
    if (exist) {
      return true;
    } else {
      return false;
    }
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

  const tbody =
    surveyData?.data?.map((item) => ({
      key: item.id,
      tdata: [
        {
          variant: 'custom',
          data: {
            children: (
              <input
                type="checkbox"
                onChange={() => handleChange(item.id)}
                name={item.id}
                checked={setCheckedItem(item.id)}
                class=" rounded-md border-gray-300	"
              />
            ),
          },
        },
        { variant: 'data', data: { title: item.name } },
        { variant: 'dataNumeric', data: { title: item.points } },
        { variant: 'dataNumeric', data: { title: item.gems } },
        { variant: 'dataNumeric', data: { title: item.score } },
      ],
    })) || [];
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-10">
              <div className="sm:flex sm:items-start">
                <div className="mt-2 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-7 reg-14 flex justify-between text-blue-500 bg-blue-50 p-4 rounded-xl"
                  >
                    <p className="flex">
                      <InformationCircleIcon className="width-16 mr-2" />
                      You can add multiple existing surveys or create a new one.
                    </p>
                    <button onClick={() => router.push('/admin/survey')}>
                      Create New Surveys →
                    </button>
                  </Dialog.Title>
                  <div className="mt-5 space-y-4" style={{ width: '1116px' }}>
                    <SearchForm
                      onSearch={onSearch}
                      placeholder={'Search by Title'}
                    />

                    {/* <Filter
                      filterData={formData}
                      changeFilterData={updateFormData}
                      resetFilter={onRefresh}
                    /> */}

                    <Table
                      thead={['', 'TITLE', 'SCORE', 'COINS', 'GEMS']}
                      tbody={tbody}
                    />
                    <div className="mt-7">
                      {surveys?.pagination.totalPages > 1 ? (
                        <Pagination pagination={pagination} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end w-full gap-4 mt-6">
                    <button
                      className="border border-base-500 rounded-lg p-2 width-111 reg-14 bg-white text-base-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="border border-base-500 rounded-lg p-2 width-131 reg-14 bg-base-500 text-white"
                      onClick={onSelect}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
