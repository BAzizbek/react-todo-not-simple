import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { DELETE, EDIT, DONE } from '../../redux/actionTypes/actionTypes'


function Todo({ el }) {

  const [state, setState] = useState(false);
  const dispatch = useDispatch()

  const toggleState = () => {
    setState(e => !e)
  }


  const deleteBtn = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.id;
    fetch(`/todo/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'Application/json' }
    })
      .then(res => res.json())
      .then(data => dispatch({ type: DELETE, payload: data }))
  }

  const handlerEdit = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const { edit: { value: edit } } = e.target;
    fetch(`/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({ edit })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: EDIT, payload: data }))

    toggleState()
  }

  const isDone = (e) => {
    const id = e.target.parentElement.parentElement.id;
    fetch(`/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'Application/json' },
    })
      .then(res => res.json())
      .then(data => dispatch({ type: DONE, payload: data })
      )
  }

  return (
    <div id={el._id}>

      { state ?
        <form id={el?._id} onSubmit={handlerEdit}>
          <input type='text' name='edit' required defaultValue={el?.title} />
          <button className="btn btn-primary" >save</button>
          <button onClick={toggleState} className="btn btn-primary" >cancel</button>
        </form> :

        <>
          <li className="list-group-item list-group-item-info">
            {el.isDone && <input onChange={isDone} className="form-check-input mt-0" type="checkbox" checked />}
            {!el.isDone && <input onChange={isDone} className="form-check-input mt-0" type="checkbox" />}
            {el?.title}

            <button onClick={toggleState} className="btn btn-primary" >edit</button>
            <button onClick={deleteBtn} className="btn btn-danger">delete</button>
          </li>
        </>
      }

    </div>
  )
}

export default Todo;
