import {UserActionTypes} from "./user.types";

export const setCurrentUser = userId => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userId
});


export const userTypeToggle = value => {
  const action ={
    type: UserActionTypes.TOGGLE_USER_TYPE,
    payload: value
  }

  return action;
}