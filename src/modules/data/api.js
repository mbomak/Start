import callApi from 'shared/services/api';

export const fetchData = params => callApi({
    url: `${window.Config.api.fetchData}`,
    method: 'GET',
    timeout: 1000,
    responseEncoding: 'utf8',
    maxContentLength: 2000
});
