import { useDispatch } from 'react-redux'
import { DELETE, DONE } from '../../redux/actionTypes/actionTypes'
import { Link } from "react-router-dom"


function Todo({ el }) {

  const dispatch = useDispatch()

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

  const isDone = (e) => {
    const id = e.target.parentElement.parentElement.id;
    fetch(`/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'Application/json' },
    })
      .then(res => res.json())
      .then(data => dispatch({ type: DONE, payload: data }))
  }

  return (
    // div 'id', sent to server
    <div id={el._id} className='d-flex flex-column align-items-center'>
      <div className="list-group-item list-group-item-light mb-2 w-50 d-flex flex-row align-items-center">
        <button onClick={deleteBtn} className="btn btn-danger btn-sm ">delete</button>
        {el.isDone && <input onChange={(e) => isDone(e)} className="form-check-input mt-0 mx-3" type="checkbox" checked />}
        {!el.isDone && <input onChange={(e) => isDone(e)} className="form-check-input mt-0 mx-3" type="checkbox" />}
        <Link to={`/edit/${el._id}`} style={{ textDecoration: 'none' }}>{el?.title}</Link>

      </div>
    </div>
  )
}

export default Todo;
