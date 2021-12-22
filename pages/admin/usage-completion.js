import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import CalendarPicker from 'components/Completion/CalendarPicker';
import Filter from 'components/Filter/Filter';
import { SearchForm } from 'components/Completion/SearchForm';
import {
  CalendarIcon,
  LightBulbIcon,
  UsersIcon,
  PresentationChartLineIcon,
  DownloadIcon,
} from '@heroicons/react/outline';

import Table from 'components/admin/Table';
import CompletionCard from 'components/Completion/CompletionCard';
import moment from 'moment';
import {
  useCompletion,
  getCountry,
  useDepartments,
} from 'hooks/completion/useCompletion';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import { ClipboardListIcon } from '@heroicons/react/outline';
import { useDownloadLogCompletion } from 'hooks/completion/useCompletionLog';
import DownloadModal from 'components/Completion/DownloadModal';

export default function UserCompletion() {
  const router = useRouter();
  if (!router.isReady) return null;

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const openCalendar = (calendarOpen) => {
    setCalendarOpen(calendarOpen);
  };

  const onDateChange = (value) => {
    setDateSelect(value);
    let newFilter = {
      ...queryData,
      ['dateBefore']: moment(value[0].format('YYYY-MM-DD')),
      ['dateAfter']: moment(value[1].format('YYYY-MM-DD')),
    };
    setQuery(newFilter);
  };
  const onResetCalendar = () => {
    setDateSelect([]);
    setCalendarOpen(false);
    let newFilter = {
      ...queryData,
      ['dateBefore']: null,
      ['dateAfter']: null,
    };
    setQuery(newFilter);
  };

  const [dateSelect, setDateSelect] = useState([]);

  const objectType = {
    'All Type': 'all',
    Journey: 'event',
    Survey: 'survey',
    Quiz: 'exam',
    Resources: 'resource',
    Link: 'link',
    Media: 'media',
    Task: 'task',
    'Weekly Challenge': 'weekly_challenge',
    'Invitation Challenge': 'invitation_challenge',
    'Bulk Upload': 'resource_completion_bulk_create',
  };
  var objectType_array = Object.keys(objectType).map(function (i, index) {
    return {
      title: i === 'Invitation Challenge' ? 'Invitational Challenge' : i,
      id: index == 0 ? 'all' : objectType[i],
      selected: index == 0 ? true : false,
    };
  });

  const config = [
    {
      title: 'Item Type',
      submenu: objectType_array,
    },
    {
      title: 'Department/Position',
      submenu: [],
    },
    {
      title: 'Countries',
      submenu: [],
    },
  ];

  const filterData = {
    positionIds: [],
    objectType: [],
    countryCode: [],
    dateAfter: null,
    dateBefore: null,
    q: '',
  };
  const initialMenuFilter = Object.freeze(config);
  const initialFilter = Object.freeze(filterData);
  const [formData, updateFormData] = useState(initialMenuFilter);
  const [departmentData, setUpdateDeparmentData] = useState([]);
  const [countryData, setUpdateCountryData] = useState([]);
  const [queryData, setQuery] = useState(initialFilter);

  const convertCountries = (countryList) => {
    const country_array = countryList?.data.map((country) => {
      return {
        id: country.code,
        title: country.name,
      };
    });

    country_array.unshift({
      id: 'all',
      title: 'All Countries',
      selected: true,
    });

    let newCountry = JSON.parse(JSON.stringify(country_array));
    setUpdateCountryData(newCountry);
  };

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
  const { data: countryList } = getCountry({
    query: {},
    options: { onSuccess: (data) => convertCountries(data) },
  });

  const getReport = () => {
    mutate();
  };

  useEffect(() => {
    let newConfig = formData;

    if (countryList?.data) {
      newConfig = newConfig.map((config) => {
        if (config.title === 'Countries') {
          return {
            title: 'Countries',
            submenu: JSON.parse(JSON.stringify(countryData)),
          };
        } else return config;
      });
    }

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
  }, [departmentData, countryData]);

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

    let objectTypeData = formData.find(
      ({ title }) => title === 'Item Type'
    ).submenu;

    let countryData = formData.find(
      ({ title }) => title === 'Countries'
    ).submenu;

    let newQueryData = {
      ...queryData,
      positionIds: positionMenu,
      department_id: departmentMenu,
      objectType: objectTypeData
        .map((menu) => {
          if (objectTypeData[0].selected) return undefined;
          if (menu.selected) return menu.id;
        })
        .filter((menu) => menu !== undefined),
      countryCode: countryData
        .map((menu) => {
          if (countryData[0].selected) return undefined;
          if (menu.selected) return menu.id;
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
  }, [formData, dateSelect]);

  const pagination = usePagination({
    page: 1,
    itemsPerPage: 10,
    maxPageItems: 9,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const { data: completion, isLoading } = useCompletion({
    query: {
      ...queryData,
      dateAfter: moment(JSON.parse(JSON.stringify(queryData?.dateBefore)))
        ?.subtract(1, 'day')
        .endOf('day')
        .toISOString(),
      dateBefore: moment(JSON.parse(JSON.stringify(queryData?.dateAfter)))
        ?.endOf('day')
        .toISOString(),
      page,
      perPage: 10,
    },
  });

  const {
    mutate,
    data: downloadData,
    isSuccess,
    isLoading: pending_download,
  } = useDownloadLogCompletion({
    ...queryData,
    context: 'completion',
    dateAfter: moment(JSON.parse(JSON.stringify(queryData?.dateBefore)))
      ?.subtract(1, 'day')
      .endOf('day')
      .toISOString(),
    dateBefore: moment(JSON.parse(JSON.stringify(queryData?.dateAfter)))
      ?.endOf('day')
      .toISOString(),
  });

  useEffect(() => {
    if (isSuccess) {
      setDownloadModal(true);
      setTimeout(() => {
        setDownloadModal(false);
      }, 5000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (completion?.data) {
      let totalPages = completion?.pagination?.totalPages || 1;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [completion]);

  const onSearch = (e) => {
    let newFilter = { ...queryData, ['q']: e.target.value };
    setQuery(newFilter);
  };

  const { permission } = useAuth();
  if (!permission['view_link'])
    return <div>You are not allowed to enter this page</div>;

  const onRefresh = () => {
    const config = [
      {
        title: 'Item Type',
        submenu: objectType_array,
      },
      {
        title: 'Department/Position',
        submenu: departmentData,
      },
      {
        title: 'Countries',
        submenu: countryData,
      },
    ];
    updateFormData(JSON.parse(JSON.stringify(config)));
  };

  if (isLoading) return null;

  const tbody =
    completion?.data?.map((completion) => ({
      key: completion.id,
      tdata: [
        {
          variant: 'data',
          data: {
            title: moment(completion['time']).format('DD MMM YYYY, hh:mm:ss A'),
          },
        },
        { variant: 'data', data: { title: completion.user.id } },
        {
          variant: 'user',
          data: {
            name: completion.user.name,
            email: completion.user.email,
          },
        },
        {
          variant: 'subtitle',
          data: {
            title: completion.user.departmentName,
            subtitle: completion.user.positionName,
          },
        },
        {
          variant: 'data',
          data: { title: completion['itemType'].replace('_', ' ') },
        },
        { variant: 'data', data: { title: completion.user.country } },
      ],
    })) || [];

  return (
    <div className="flex-col ">
      <section className=" mobile:ml-0 mobile:mt-4 w-full ">
        <h1 className="text-xl my-4 font-medium leading-7 text-black">
          Usage Completion
        </h1>{' '}
        <div className="flex mobile:flex-col	mobile:gap-2 mobile:items-start items-center py-5">
          <SearchForm
            onSearch={onSearch}
            placeholder={'Search by User ID, Name, or Email '}
          />
          <div className="ml-5 mobile:ml-0 mobile:w-full mobile:items-start inline-flex relative justify-center rounded-md border border-gray-300 shadow-inner px-3 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-base-500 min-width-307">
            <CalendarPicker
              onOpenChange={openCalendar}
              open={calendarOpen}
              value={dateSelect}
              onChange={onDateChange}
              onAllTime={onResetCalendar}
            />

            <CalendarIcon className=" pl-1 h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <Filter
          filterData={formData}
          changeFilterData={updateFormData}
          resetFilter={onRefresh}
        />
        <div className="flex space-x-4 mobile:space-x-0 mobile:flex-col	 py-5">
          <CompletionCard
            Title={'Total Completion(s)'}
            total={completion?.totalCompletions ?? 0}
            icon={
              <LightBulbIcon className="mobile:h-6 text-white h-12 mr-4 bg-blue-900 px-2 py-2 rounded-lg" />
            }
          />
          <CompletionCard
            Title={'Unique User Completion(s)'}
            total={completion?.totalUsers || 0}
            icon={
              <UsersIcon className="mobile:h-6 text-white h-12 mr-4 bg-blue-900 px-2 py-2 rounded-lg" />
            }
          />
        </div>
        <div className="flex items-center py-5 flex-row-reverse gap-2.5">
          <button
            class="bg-blue-900  hover:bg-grey  py-2 px-4 rounded inline-flex items-center"
            onClick={() => getReport()}
          >
            {pending_download ? (
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
              <DownloadIcon className="mobile:h-6 text-white h-7 mr-2 bg-blue-900  py-1 rounded-lg" />
            )}

            <span className="text-white text-normal text-white-500">
              Export CSV
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2.5 border border-transparent text-normal font-medium rounded-md text-base-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => router.push('/admin/usage-log')}
          >
            <ClipboardListIcon className="text-current mr-2 w-5" />
            Download History
          </button>
        </div>
        <Table
          thead={[
            'DATE/TIME',
            'USER ID',
            'NAME/EMAIL',
            'DEPARTMENT/POSITION',
            'ITEM TYPE',
            'COUNTRY',
          ]}
          tbody={tbody}
        />
        <div className="mt-7">
          <Pagination pagination={pagination} />
        </div>
        <div className="absolute ">
          <DownloadModal Show={downloadModal} setShow={setDownloadModal} />
        </div>
      </section>
    </div>
  );
}
