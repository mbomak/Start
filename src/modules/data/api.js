import callApi from 'shared/services/api';

export const fetchOccasions = (params) => {
    return callApi({
        method: 'GET',
        url: window.Config.api.occasions,
        params
    });
};

export const fetchOccasionAnalytics = (params) => {
    return callApi(
        {
            method: 'GET',
            url: window.Config.api.occasionAnalytics,
            params
        }
    );
}
