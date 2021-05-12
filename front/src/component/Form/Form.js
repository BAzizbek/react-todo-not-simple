import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { ADD } from '../../redux/actionTypes/actionTypes'

function Form() {

  const dispatch = useDispatch()
  const user  = useSelector(store => store.user)
  console.log(user);
  const history = useHistory()

  const handlerAdd = (e) => {
    e.preventDefault();
    const { title: { value: title } } = e.target;  // const title === e.target.edit.value
    const { comment: { value: comment } } = e.target
    fetch('/todo', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({ title, comment })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: ADD, payload: data }))
      .then(() => history.push('/'))
  }

  return (
    <div>
      <h4 className="container text-center fs-4 m-4">Adding a new todo:</h4>
      <form onSubmit={(e) => handlerAdd(e)} className="d-flex flex-column align-items-center">
        <div className="form-floating mb-3 w-50">
          <input
            className="form-control"
            required
            name='title'
            autoFocus
            type="text" />
          <label htmlFor="floatingInput">Title:</label>
        </div>
        <div className="form-floating mb-3 w-50">
          <input
            type="text"
            name='comment'
            className="form-control"
            placeholder="Comment" />
          <label htmlFor="floatingComment">Comment:</label>
        </div>
        <button type='submit' className="btn btn-primary w-25" >Add</button>
      </form>
    </div>
  );
}

export default Form;
