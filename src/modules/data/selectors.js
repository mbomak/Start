import { createSelector } from 'reselect';

const data = state => state;

const takeBalance = createSelector(
    data,
    obj => +obj.data.balance
);

export default {
  takeBalance,
};
