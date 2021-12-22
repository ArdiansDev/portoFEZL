import { useMutation } from 'react-query';
import { client } from 'utils/client';

function download(fileUrl, fileName) {
  var a = document.createElement('a');
  a.href = fileUrl;
  a.setAttribute('download', fileName);
  a.setAttribute('target', '_blank');
  a.click();
}

const fetchReportId = async (id) => {
  return client(`/reports/` + id).then((res) => {
    const { status, fileUrl, filename, id, secondaryFileUrl, secondaryFilename } = res.data;

    switch (status) {
      case 'unready':
        fetchReportId(id);
        break;
      case 'downloaded':
        download(fileUrl, filename);
        download(secondaryFileUrl, secondaryFilename);
        break;
    }
  });
};

const useDownloadLogCompletion = (payload) => {
  return useMutation(
    () =>
      client('/reports', {
        method: 'POST',
        data: payload,
      }),
    {
      onSuccess: (data) => {
        if (data.data.id) {
          fetchReportId(data.data.id);
        }
      },
    }
  );
};

export { useDownloadLogCompletion };
