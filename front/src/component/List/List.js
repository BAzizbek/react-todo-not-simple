import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { INIT } from '../../redux/actionTypes/actionTypes'
import Todo from '../Todo/Todo'


function List() {
  
  const dispatch = useDispatch()
  const state = useSelector(state => state.todo.todos)

  useEffect(() => {
    fetch('/todo')
    .then(res => res.json())
    .then(data => {
      dispatch({type: INIT, payload: data})
    })
  }, [dispatch])
  
  return (
    <div>
      <h4 className="container text-center m-4">List of all todos:</h4>
      {state?.map(el => <Todo key={el._id} el={el}/> )}
    </div>
  );
}

export default List;
