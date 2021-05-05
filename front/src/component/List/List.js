import React, { useEffect } from 'react';
import Todo from '../Todo/Todo'
import { useDispatch, useSelector } from 'react-redux'
import { INIT } from '../../redux/actionTypes/actionTypes'




function List() {
  
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
    fetch('/todo')
    .then(res => res.json())
    .then(data => {
      dispatch({type: INIT, payload: data})
    })
  }, [dispatch])
  
  return (
    <div>
      {state && state.map(el => <Todo key={el._id} el={el}/> )}
    </div>
  );
}

export default List;
