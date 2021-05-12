// need to fix search
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { INIT } from '../../redux/actionTypes/actionTypes'
import SignOut from '../Auth/SignOut'


function Nav(props) {

  const dispatch = useDispatch()
  const store = useSelector(store => store)
  const { isAuth } = useSelector(store => store.user)
  // console.log(isAuth);
  const history = useHistory()
  const [found, setFound] = useState([])
  const searchTodo = (e) => {
    let sorted = store.filter(el => el.title.toLowerCase().includes((e.target.value).trim()))
    setFound(sorted)
    // dispatch({type: INIT, payload: sorted})
  }

  function edit(e) {
    console.log(e);
    // history.push(`/edit/${found[0]?._id}`)
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand me-5" to="/">Just <img src="/favicon.ico" type="image/png" alt="icon" /> it.</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Main</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/completed">Completed</Link>
              </li>
            </ul>
            <form className="d-flex" onChange={(e) => edit(e.target.search)}>
              <input
                name='search'
                id='search'
                placeholder="Search todos..."
                className="form-control me-2"
                aria-label="Search"
                type="search"
                list='foundtodos'
                onChange={(e) => searchTodo(e)} />
              <datalist id='foundtodos'>
                {found?.map(el => <option key={el._id} value={el._id} />)}
              </datalist>
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
            {isAuth ? <SignOut /> : <Link to='/signup'>
              <button className="btn btn-outline-primary ms-5 me-2" type="button">Sign Up</button>
            </Link>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
