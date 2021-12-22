import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import Table from 'components/admin/Table';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import ModalUploadFile from 'components/ModalUploadMultipleTable';
import { useCategories } from 'hooks/categories/useCategories';
import ModalSuccesUpload from 'components/ModalSuccesUpload';
import { PlusIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useDepartments } from 'hooks/completion/useCompletion';
import ModalWarningDelete from 'components/admin/ModalWarningDelete';
import {
  useAdminJourneyUserAssigned,
  useAdminJourneyUserGroupAssigned,
  useUnassignGroupFromJourney,
  useUnassignUserFromJourney,
} from 'hooks/journeys/useJourneys';

export default function UserRoles() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { journey_id } = router.query;
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
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadNotif, setUploadNotif] = useState(false);
  const [statusAndRemarks, setStatusAndRemarks] = useState();
  const [pendingUpload, setPendingUpload] = useState();
  const [tab, setTab] = useState('individual');
  const [openModalDeleteAssigneeUser, setOpenModalDeleteAssigneeUser] =
    useState(false);
  const [openModalDeleteAssigneeGroup, setOpenModalDeleteAssigneeGroup] =
    useState(false);
  const [toBeUnassignUserId, setToBeUnassignUserId] = useState();
  const [toBeUnassignGroupId, setToBeUnassignGroupId] = useState();

  // console.log('toBeUnassignUserId', toBeUnassignUserId);

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
    itemsPerPage: 10,
    maxPageItems: 9,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const {
    data: userRoles,
    isLoading,
    refetch: refetchUserRoles,
  } = useAdminJourneyUserAssigned({
    query: {
      ...queryData,
      page,
      perPage: 10,
    },
    id: journey_id,
  });

  const {
    data: userGroups,
    isLoading: groupLoading,
    refetch: refetchUserGroups,
  } = useAdminJourneyUserGroupAssigned({
    query: {
      ...queryData,
      perPage: 10,
      page,
    },
    id: journey_id,
  });

  const { mutate: unuassignUser } = useUnassignUserFromJourney({
    journeyId: journey_id,
    options: { onSuccess: () => refetchUserRoles() },
  });
  const { mutate: unuassignGroup } = useUnassignGroupFromJourney({
    journeyId: journey_id,
    options: { onSuccess: () => refetchUserGroups() },
  });

  useEffect(() => {
    if (userRoles?.data && tab === 'individual') {
      let totalPages = userRoles?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    } else if (userGroups?.data && tab === 'group') {
      let totalPages = userGroups?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [tab]);

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  if (isLoading || groupLoading) return null;

  const tbody = userRoles?.data?.map((data) => ({
    key: data.id,
    tdata: [
      {
        variant: 'subtitle',
        data: { title: data['name'], subtitle: data['email'] },
      },
      {
        variant: 'data',
        data: { title: data['assignedDate'] },
      },
      {
        variant: 'deleteAction',
        data: {
          onClick: () => {
            setToBeUnassignUserId(data['id']);
            setOpenModalDeleteAssigneeUser(true);
          },
        },
      },
    ],
  }));
  const tbody2 = userGroups?.data?.map((data) => ({
    key: data.id,
    tdata: [
      {
        variant: 'subtitle',
        data: { title: data['name'], subtitle: data['email'] },
      },
      {
        variant: 'data',
        data: { title: data['memberCount'] },
      },

      {
        variant: 'data',
        data: { title: data['assignedDate'] },
      },
      {
        variant: 'deleteAction',
        data: {
          onClick: () => {
            setToBeUnassignGroupId(data['userGroupId']);
            setOpenModalDeleteAssigneeGroup(true);
          },
        },
      },
    ],
  }));
  const AssignedId = userRoles?.data?.map((data) => {
    return data.id;
  });

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <div className="flex mt-6 justify-between items-center">
          <h1 className="text-xl my-4 flex  items-center font-medium leading-7 text-black">
            <ArrowLeftIcon
              className="h-5 w-5 mr-5 cursor-pointer"
              onClick={() => router.push('/admin/journey?tab=assigned')}
            />
            Assign Journey
          </h1>
          <button
            class="width-195 bg-base-500 height-35 hover:bg-base-700 justify-center py-2 px-4 rounded inline-flex items-center"
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
              <PlusIcon className="mobile:h-6 text-white h-7 mr-2  py-1 rounded-lg" />
            )}
            <span className="text-white text-normal text-white-500">
              Assign User
            </span>
          </button>
        </div>
        <div className="flex items-center py-5 gap-11">
          <SearchForm onSearch={onSearch} placeholder={'Search by Name'} />
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
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    onClick={() => setTab('individual')}
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
                    onClick={() => setTab('group')}
                    className={classNames(
                      tab === 'group'
                        ? 'border-secondary text-secondary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    Users Group
                  </button>
                </nav>
              </div>
            </div>
          </div>
          {tab === 'individual' ? (
            <Table
              thead={['NAME/EMAIL', 'DATE ASSIGNED', 'ACTION']}
              tbody={tbody}
              title={'user'}
            />
          ) : (
            <Table
              thead={['NAME', 'NO OF MEMBERS', 'DATE ASSIGNED', 'ACTION']}
              tbody={tbody2}
              title={'group'}
            />
          )}
        </div>

        <div className="mt-7">
          {tab === 'individual' && userRoles.pagination.totalPages > 1 ? (
            <Pagination pagination={pagination} />
          ) : tab === 'group' && userGroups?.pagination?.totalPages > 1 ? (
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
          data={userRoles}
          data2={userGroups}
          setPendingUpload={setPendingUpload}
          open={uploadModal}
          setOpen={setUploadModal}
          refetch={refetchUserRoles}
          refetchUserGroup={refetchUserGroups}
          setUploadNotif={setUploadNotif}
          setStatusAndRemarks={setStatusAndRemarks}
          selectTab={setTab}
          id={journey_id}
          AssignedId={AssignedId}
        />
      )}

      {openModalDeleteAssigneeUser && (
        <ModalWarningDelete
          open={openModalDeleteAssigneeUser}
          setOpen={setOpenModalDeleteAssigneeUser}
          title={'Unassign User'}
          subtitle={
            'Are you sure want to unuassign this user? This action cannot be undone.'
          }
          primaryText={'Unassign'}
          secondaryText={'Cancel'}
          onSubmit={() => {
            unuassignUser(toBeUnassignUserId);
            setToBeUnassignUserId();
          }}
        />
      )}

      {openModalDeleteAssigneeGroup && (
        <ModalWarningDelete
          open={openModalDeleteAssigneeGroup}
          setOpen={setOpenModalDeleteAssigneeGroup}
          title={'Unassign Group'}
          subtitle={
            'Are you sure want to unuassign this user? This action cannot be undone.'
          }
          primaryText={'Unassign'}
          secondaryText={'Cancel'}
          onSubmit={() => {
            unuassignGroup(toBeUnassignGroupId);
            setToBeUnassignGroupId();
          }}
        />
      )}
    </div>
  );
}
