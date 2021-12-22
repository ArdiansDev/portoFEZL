import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import { UploadIcon } from '@heroicons/react/outline';
import Table from 'components/admin/Table';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import ModalUploadFile from 'components/ModalUploadTable';
import { useUserRolesAdmin } from 'hooks/user_roles/useUserRoles';
import ModalSuccesUpload from 'components/ModalSuccesUpload';
import { useDepartments } from 'hooks/completion/useCompletion';

export default function UserRoles() {
  const router = useRouter();
  if (!router.isReady) return null;
  const config = [
    {
      title: 'Department/Position',
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
  const [departmentData, setUpdateDeparmentData] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadNotif, setUploadNotif] = useState(false);
  const [statusAndRemarks, setStatusAndRemarks] = useState();
  const [pendingUpload, setPendingUpload] = useState();

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
  } = useUserRolesAdmin({
    query: {
      ...queryData,
      page,
      perPage: 10,
    },
  });

  useEffect(() => {
    if (userRoles?.data) {
      let totalPages = userRoles?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [userRoles]);

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

  if (isLoading) return null;

  const tbody = userRoles?.data?.map((data) => ({
    key: data.id,
    tdata: [
      { variant: 'user', data: { name: data['name'], img: data['img'] } },
      {
        variant: 'data',
        data: { title: data['id'] },
      },
      {
        variant: 'subtitle',
        data: { title: data['departmentName'], subtitle: data['positionName'] },
      },
      {
        variant: 'userStatus',
        data: { title: data['status'] },
      },
      // { variant: 'userAction' },
    ],
  }));

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <h1 className="text-xl my-4 font-medium leading-7 text-black">
          User Roles
        </h1>
        <div className="flex items-center py-5 gap-11">
          <SearchForm onSearch={onSearch} placeholder={'Search by Title'} />

          <button
            class="width-195 bg-blue-900 height-35 hover:bg-grey  py-2 px-4 rounded inline-flex justify-center items-center"
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
          <Table
            thead={[
              'NAME',
              'USER ID',
              'DEPARTMENT & POSITION',
              'STATUS',
              // 'ACTION',
            ]}
            tbody={tbody}
            title={'user roles'}
          />
        </div>
        <div className="mt-7">
          {userRoles?.pagination.totalPages > 1 ? (
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
          tbody={tbody}
          setPendingUpload={setPendingUpload}
          open={uploadModal}
          setOpen={setUploadModal}
          refetch={refetchUserRoles}
          setUploadNotif={setUploadNotif}
          setStatusAndRemarks={setStatusAndRemarks}
        />
      )}
    </div>
  );
}
