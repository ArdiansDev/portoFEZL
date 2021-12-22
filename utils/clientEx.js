import { queryCache } from 'react-query';
import axios from 'axios';
import { toCamelCase, toSnakeCase } from 'utils/caseConverter';
import qs from 'qs';
const { match } = require('node-match-path');

export async function client(
  endpoint,
  { data, method = 'GET', params, headers: customHeaders, ...customConfig } = {}
) {
  // let token = localStorage.getItem('token');
  const query = location.search;
  const token = new URLSearchParams(query).get('token');
  let apiURL = process.env.NEXT_PUBLIC_APP_API_URL;
  let mockAPIS = localStorage.getItem('__ac_request_fail_config__');
  let parseMockAPIS = JSON.parse(mockAPIS);
  // if (response.status === 401) {
  //   queryCache.clear()
  //   await auth.logout()
  //   // refresh the page for them
  //   window.location.assign(window.location)
  //   return Promise.reject({message: 'Please re-authenticate.'})
  // }
  let mappedMock = parseMockAPIS?.map((mock) => {
    let route = mock.route;
    route = route?.replace('[', ':').replace(']', '');

    return {
      route,
      method: mock.method,
    };
  });

  if (
    mappedMock &&
    mappedMock?.length > 0 &&
    mappedMock?.some(
      (mockApi) =>
        match(mockApi.route, endpoint).matches && mockApi.method === method
    )
  ) {
    apiURL = 'https://calm-fortress-58213.herokuapp.com/api';
  }

  const config = {
    url: `${apiURL}${endpoint}`,
    method: method ? method : data ? 'POST' : 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    },
    ...customConfig,
  };

  if (params) {
    config.params = toSnakeCase(params);
    config.method = 'GET';
    config.paramsSerializer = (params) => {
      return qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: true,
        skipNulls: true,
      });
    };
  }

  if (data) {
    config.data = toSnakeCase(data);
  }

  return axios(config).then(async (response) => {
    // if (response.status === 401) {
    //   queryCache.clear()
    //   await auth.logout()
    //   // refresh the page for them
    //   window.location.assign(window.location)
    //   return Promise.reject({message: 'Please re-authenticate.'})
    // }

    const data = await toCamelCase(response.data);
    if (response.statusText === 'OK') {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
