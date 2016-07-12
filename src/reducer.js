import { combineReducers } from "redux"

const userNames = (state={}, action) => {
	switch (action.type) {
	  case 'RECEIVE_USER_NAMES':
	    return action.payload.user;
	  default:
	    return state;
	}
}

const users = (state=[], action) => {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return action.payload.users;
    case 'RECEIVE_USER':
      return [...state, action.payload.user];
    default:
      return state;
  }
}

const reducer = combineReducers({
  users,
  userNames,
})

export default reducer;
