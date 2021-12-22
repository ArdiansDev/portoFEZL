import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchUsageLog = async ({ query = {} }) => {
  return client(`/reports`, { params: query });
};

function download(fileUrl, fileName) {
  var a = document.createElement('a');
  a.href = fileUrl;
  a.setAttribute('download', fileName);
  a.setAttribute('target', '_blank');
  a.click();
}

const fetchReportId = async (id) => {
  return client(`/reports/` + id).then((res) => {
    const { status, fileUrl, filename, id } = res.data;

    switch (status) {
      case 'unready':
        fetchReportId(id);
        break;
      case 'downloaded':
        download(fileUrl, filename);
        break;
    }
  });
};

const useUsageLog = ({ query, options }) => {
  return useQuery(['user-usageLog', query], () => fetchUsageLog({ query }), {
    keepPreviousData: true,
    ...options,
  });
};

export { useUsageLog, fetchUsageLog };
