import { useDispatch } from 'react-redux'
import { ADD } from '../../redux/actionTypes/actionTypes'

function Form() {

  const dispatch = useDispatch()

  const handlerAdd = (e) => {
    e.preventDefault();
    const { title: { value: title } } = e.target;
    fetch('/todo', {
      method: 'POST',
      headers: {'Content-type': 'Application/json'},
      body: JSON.stringify({title})
    })
    .then(res => res.json())
    .then(data => dispatch({type: ADD, payload: data}))
  }

  return (
    <form onSubmit={handlerAdd}>
      <input name='title' type='text' required/>
      <button>Add</button>
    </form>
  );
}

export default Form;
