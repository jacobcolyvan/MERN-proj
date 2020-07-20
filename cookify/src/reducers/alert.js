//takes in a piece of state and an action, actions will be dispatched by an actions file

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      //copy previous alerts and add a new alert
      return [...state, payload];
    case REMOVE_ALERT:
      //return alerts that don't match the id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
