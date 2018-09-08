import axios from 'axios';

axios.defaults.baseURL = window.Config.api.root;
//axios.defaults.paramsSerializer = params => queryString.stringify(params);
axios.defaults.withCredentials = false;

const callApi = (options) => {
    const requestOptions = {
        ...options
    };

    return axios(requestOptions)
        .then(({data, ...response }) => {
            response.data = data;
            return response;
        });
};

export default callApi;
