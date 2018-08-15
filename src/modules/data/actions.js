import * as types from './constants';

export function addFreeCredits() {
  return {
    type: types.ADD_FREE_CREDITS,
    payload: 100
  };
}