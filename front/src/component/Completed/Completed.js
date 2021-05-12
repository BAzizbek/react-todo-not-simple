import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { INIT } from '../../redux/actionTypes/actionTypes'
import Todo from '../Todo/Todo'


function Completed(props) {

  const dispatch = useDispatch()
  const state = useSelector(state => state.todo.todos)

  useEffect(() => {
    fetch('/todo/done')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: INIT, payload: data })
      })
  }, [dispatch])

  return (
    <div>
      <h4 className="container text-center m-4">List of all completed todos:</h4>
      {state?.filter((el) => el.isDone === true).map(el => <Todo key={el._id} el={el} />)}
    </div>
  );
}

export default Completed;
