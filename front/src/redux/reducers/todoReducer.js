import { INIT, ADD, DELETE, EDIT, DONE } from '../actionTypes/actionTypes'

const initialState = { title: 'TODOs', todos: [] }

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return { ...state, todos: action.payload.sort((a, b) => b.created - a.created)}

    case ADD:
      return {...state, todos: [...state.todos, action.payload]}

    case DELETE:
      return {...state, todos: state.todos.filter(el => el._id !== action.payload)}

    case EDIT:
      return {...state, todos: state.todos.map(el => el._id === action.payload._id ? { ...el, title: action.payload.title } : el)}

    case DONE:
      return {...state, todos: state.todos.map(el => el._id === action.payload._id ? { ...el, isDone: !action.payload.isDone } : el)}

    default:
      return state;
  }
}

export default todoReducer;
