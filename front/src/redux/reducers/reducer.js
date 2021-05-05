import { INIT, ADD, DELETE, EDIT, DONE } from '../actionTypes/actionTypes'

// const initialState = { title: 'TODOs', todos: [] }

const reducer = (state = [], action) => {
  switch (action.type) {
    case INIT:
      return [...state, ...action.payload]

    case ADD:
      return [...state, action.payload]

    case DELETE:
      return state.filter(el => el._id !== action.payload)

    case EDIT:
      // return state.map(el => el._id === action.payload ? el.title = !el.title : el)
      return state.map(el => el._id === action.payload._id ? { ...el, title: action.payload.title } : el)

    case DONE:
      return state.map(el => el._id === action.payload._id ? { ...el, isDone: !action.payload.isDone } : el)

    default:
      return state;
  }
}

export default reducer;
