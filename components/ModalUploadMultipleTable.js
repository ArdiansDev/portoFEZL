/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Table from './admin/Table';
import Pagination from 'components/Completion/Pagination';
import { SearchForm } from 'components/Completion/SearchForm';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Filter from 'components/Filter/Filter';
import { useDepartments } from 'hooks/completion/useCompletion';
import usePagination from '@lucasmogari/react-pagination';
import { usePostJourney } from 'hooks/journeys/useJourneys';
import {
  useAdminJourneyUser,
  useAdminJourneyUserGroup,
} from 'hooks/journeys/useJourneys';
export default function ModalUploadFile({
  open,
  setOpen,
  onAddItem,
  id,
  refetch,
  AssignedId,
}) {
  const cancelButtonRef = useRef(null);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const config = [
    {
      title: 'Department/Position',
      submenu: [],
    },
  ];

  const filterData = {
    positionIds: [],
  };

  const initialMenuFilter = Object.freeze(config);
  const initialFilter = Object.freeze(filterData);
  const [formData, updateFormData] = useState(initialMenuFilter);
  const [queryData, setQuery] = useState(initialFilter);
  const [departmentData, setUpdateDeparmentData] = useState([]);
  const [tab, setTab] = useState('individual');
  const [dataChecked, setDataChecked] = useState([]);
  const [groupChecked, setGroupChecked] = useState([]);

  const convertDepartments = (departmentResponse) => {
    const department_array = departmentResponse.data.map((dep) => {
      const submenu = dep?.positions?.map((depPosition) => {
        return { id: depPosition.id, title: depPosition.name };
      });

      submenu.unshift({
        id: undefined,
        title: `All Positions`,
      });

      return {
        id: dep.id,
        title: dep.name,
        submenu,
      };
    });

    department_array.unshift({
      id: undefined,
      title: 'All Department',
      selected: true,
    });

    setUpdateDeparmentData(JSON.parse(JSON.stringify(department_array)));
  };

  const { data: departments } = useDepartments({
    query: {},
    options: { onSuccess: (data) => convertDepartments(data) },
  });

  useEffect(() => {
    let newConfig = formData;
    if (departments?.data) {
      newConfig = newConfig.map((config) => {
        if (config.title === 'Department/Position') {
          return {
            title: 'Department/Position',
            submenu: JSON.parse(JSON.stringify(departmentData)),
          };
        } else return config;
      });
    }

    updateFormData(newConfig);
  }, [departmentData]);

  const reshapeQueryData = (formData) => {
    let departmentSubMenu = formData.find(
      ({ title }) => title === 'Department/Position'
    ).submenu;

    let positionMenu = [];
    let departmentMenu = [];
    departmentSubMenu.map((menu, i) => {
      if (menu.submenu && menu.submenu.length > 1) {
        menu.submenu.map((submenu, j) => {
          if (submenu.selected && j != 0) positionMenu.push(submenu.id);
          if (menu.submenu[0].selected) positionMenu.push(submenu.id);
        });
      } else {
        if (menu.selected && i != 0) departmentMenu.push(menu.id);
      }
    });

    let newQueryData = {
      ...queryData,
      positionIds: positionMenu,
      department_id: departmentMenu,
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
    itemsPerPage: 5,
    maxPageItems: 9,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const {
    data: Users,
    isLoading,
    refetch: refetchUsers,
  } = useAdminJourneyUser({
    query: {
      ...queryData,
      page,
      perPage: 5,
    },
    id: id,
  });

  const {
    data: userGroup,
    isLoading: groupLoading,
    refetch: refetchUserGroup,
  } = useAdminJourneyUserGroup({
    query: {
      ...queryData,
      page,
      perPage: 5,
    },
    id: id,
  });

  useEffect(() => {
    if (Users?.data && tab === 'individual') {
      let totalPages = Users?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    } else if (userGroup?.data && tab === 'group') {
      let totalPages = userGroup?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [Users, tab]);

  const onSearch = (e) => {
    let newFilter = { ...queryData, ['q']: e.target.value };
    setQuery(newFilter);
  };

  const onRefresh = () => {
    const config = [
      {
        title: 'Department/Position',
        submenu: departmentData,
      },
    ];
    updateFormData(JSON.parse(JSON.stringify(config)));
  };

  const handleChange = (id, e) => {
    // ini belum
    // dataChecked.push(data.id);
    const filtered = dataChecked.filter((number) => {
      return number != id;
    });
    const finded = dataChecked.some((number) => {
      return number === id;
    });
    if (!finded) {
      dataChecked.push(id);
    } else {
      setDataChecked(filtered);
    }
  };

  const handleChangeGroup = (id, e) => {
    // ini belum
    // dataChecked.push(data.id);
    const filtered = groupChecked.filter((number) => {
      return number != id;
    });
    const finded = groupChecked.some((number) => {
      return number === id;
    });
    if (!finded) {
      groupChecked.push(id);
    } else {
      setDataChecked(filtered);
    }
  };
  const onSelect = () => {
    PostJourney({ ...payload });
    setOpen(false);
  };
  const payload = {
    individual_ids: dataChecked,
    user_group_ids: groupChecked,
  };
  const { mutate: PostJourney } = usePostJourney({
    id: id,
    options: {
      onSettled: () => {
        refetch();
      },
    },
  });

  if (isLoading || groupLoading) return null;

  const tbody = Users?.data?.map((data) => ({
    key: data.id,
    tdata: [
      {
        variant: 'custom',
        data: {
          children: (
            <input
              type="checkbox"
              onChange={(e) => handleChange(data.id, e)}
              name={data.id}
              defaultChecked={dataChecked.includes(data.id || AssignedId)}
              class=" rounded-md border-gray-300	"
            />
          ),
        },
      },
      {
        variant: 'data',
        data: { title: data['name'] },
      },
      {
        variant: 'data',
        data: { title: data['email'] },
      },

      {
        variant: 'data',
        data: { title: data['departmentName'] },
      },
      {
        variant: 'data',
        data: { title: data['positionName'] },
      },
    ],
  }));

  const tbody2 = userGroup?.data?.map((data) => ({
    key: data.id,
    tdata: [
      {
        variant: 'custom',
        data: {
          children: (
            <input
              type="checkbox"
              onChange={(e) => handleChangeGroup(data.id, e)}
              name={data.id}
              defaultChecked={groupChecked.includes(data.id)}
              class=" rounded-md border-gray-300	"
            />
          ),
        },
      },
      {
        variant: 'data',
        data: { title: data['name'] },
      },
      {
        variant: 'dataNumeric',
        data: { title: data['memberCount'] },
      },
    ],
  }));
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
            <div className="inline-block align-bottom  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-10">
              <div className="sm:flex sm:items-start ">
                <div className="mt-2 text-center sm:mt-0 sm:text-left lg:width-1116">
                  <div className="mt-5 space-y-4">
                    <SearchForm
                      onSearch={onSearch}
                      placeholder={'Search by Name'}
                    />
                    {/* <Filter
                      filterData={formData}
                      changeFilterData={updateFormData}
                      resetFilter={onRefresh}
                    /> */}
                    <div className="">
                      <div className="mb-6">
                        <div className="sm:hidden">
                          <label htmlFor="tabs" className="sr-only">
                            Select a tab
                          </label>
                          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        </div>
                        <div className="hidden sm:block">
                          <div className="border-b border-gray-200">
                            <nav className="-mb-px flex" aria-label="Tabs">
                              <button
                                onClick={() => {
                                  setTab('individual');
                                }}
                                className={classNames(
                                  tab === 'individual'
                                    ? 'border-secondary text-secondary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                  'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                              >
                                Individual
                              </button>
                              <button
                                onClick={() => {
                                  setTab('group');
                                }}
                                className={classNames(
                                  tab === 'group'
                                    ? 'border-secondary text-secondary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                  'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                              >
                                User Group
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                      {tab === 'individual' ? (
                        <Table
                          thead={[
                            'SELECT',
                            'NAME',
                            'EMAIL',
                            'DEPARTMENT',
                            'POSITION',
                          ]}
                          tbody={tbody}
                          title="user"
                        />
                      ) : (
                        <Table
                          thead={['SELECT', 'NAME', 'NO OF MEMBERS']}
                          tbody={tbody2}
                          title="group"
                        />
                      )}
                    </div>

                    <div className="mt-10">
                      {tab === 'individual' &&
                      Users.pagination.totalPages > 1 ? (
                        <Pagination pagination={pagination} />
                      ) : tab === 'group' &&
                        userGroup?.pagination?.totalPages > 1 ? (
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
                      Save
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
