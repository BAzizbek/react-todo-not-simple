import { SETUSER, LOGOUT } from '../actionTypes/actionTypes'

const initialState = { user: '', isAuth: false }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:
      return {...state, user: action.payload, isAuth: true }

    case LOGOUT:
      window.localStorage.clear()
      return { ...state, user: '', isAuth: false }

    default:
      return state;
  }
}

export default userReducer;
