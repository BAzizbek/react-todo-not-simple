import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router';
import { EDIT } from '../../redux/actionTypes/actionTypes'

function Edit() {

  const { id } = useParams()
  const [todo, setTodo] = useState(null)
  const history = useHistory()

  const dispatch = useDispatch()

  const handlerEdit = (e) => {
    e.preventDefault();
    const { edit: { value: edit } } = e.target;  // const edit === e.target.edit.value
    const { comment: { value: comment } } = e.target
    
    fetch(`/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({ edit, comment })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: EDIT, payload: data }))
      .then(history.push('/'))
  }

  useEffect(() => {
    fetch(`/todo/${id}`)
      .then(res => res.json())
      .then(data => setTodo(data))
  }, [id])

  return (
    <div className="container text-center">
      <h4 className="container text-center m-4">Editing:  {todo?.title}</h4>
      <form onSubmit={(e) => handlerEdit(e)} className="d-flex flex-column align-items-center">
        <div className="form-floating mb-3 w-50 ">
          <input
            className="form-control me-2"
            required
            type='text'
            name='edit'
            defaultValue={todo?.title} />
          <label htmlFor="floatingInput">Title:</label>
        </div>
        <div className="form-floating mb-3 w-50">
          <input
            type="text"
            name='comment'
            className="form-control" 
            defaultValue={todo?.comment} />
          <label htmlFor="floatingPassword">Comment:</label>
        </div>
        <button type='submit' className="btn btn-primary btn-sm w-25" >Edit</button>
      </form>
    </div>
  );
}

export default Edit;
