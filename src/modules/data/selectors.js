import { createSelector } from 'reselect';

const data = state => state;

const takePostNumber = createSelector(
    data,
    obj => obj.data.postNumber
);

export default {
    takePostNumber,
};
