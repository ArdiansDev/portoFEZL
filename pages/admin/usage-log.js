/* This example requires Tailwind CSS v2.0+ */
import Table from 'components/admin/Table';
import { useEffect } from 'react';
import Pagination from 'components/Completion/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import { useUsageLog } from 'hooks/usage_log/useUsageLog';
import { useAuth } from 'context/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import router, { Router } from 'next/router';

export default function UsageLog() {
  const pagination = usePagination({
    page: 1,
    itemsPerPage: 15,
    maxPageItems: 7,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const { data: usageData, isRefetching } = useUsageLog({
    query: {
      page,
      perPage: pagination?.itemsPerPage,
      context: 'completion',
    },
  });

  useEffect(() => {
    if (usageData?.data) {
      let totalPages =
        usageData?.pagination?.totalPages === 0
          ? 1
          : usageData?.pagination?.totalPages;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [usageData, isRefetching]);
  const downloadLogs = (data) => {
    window.open(data.fileUrl, '_blank');
    window.open(data.secondaryFileUrl, '_blank');
    // console.log(data.secondaryFileUrl);
  };
  const tbody =
    usageData?.data?.map((usage) => ({
      key: usage.id,
      tdata: [
        {
          variant: 'data',
          data: { title: usage['filename'] },
        },
        {
          variant: 'dataBold',
          data: { title: usage.user['name'], status: usage['status'] },
        },
        { variant: 'time', data: { title: usage['downloadedAt'] } },
        { variant: 'status', data: { title: usage['status'] } },
        {
          variant: 'download',
          data: {
            title: 'Download',
            status: usage['status'],
            fileUrl: usage['fileUrl'],
            secondaryFileUrl: usage['secondaryFileUrl'],
            downloadLogs: downloadLogs,
          },
        },
      ],
    })) || [];

  return (
    <div className="mt-5">
      <h1 className="text-xl my-4 font-medium leading-7 flex gap-2 items-center text-black">
        <ArrowLeftIcon
          className="h-5 w-5 mr-5 cursor-pointer"
          onClick={() => router.push('/admin/usage-completion')}
        />{' '}
        Usage Logs
      </h1>
      <Table
        thead={['NAME', 'DOWNLOADED BY', 'DOWNLOADED AT', 'STATUS', 'ACTION']}
        tbody={tbody}
        title={'user-logs'}
      />
      {usageData?.pagination?.totalPages > 1 && (
        <div className="mt-7">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
