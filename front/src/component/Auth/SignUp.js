import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { SETUSER } from "../../redux/actionTypes/actionTypes";

function SignUp() {

  const dispatch = useDispatch()
  const history = useHistory()

  function signup(e) {
    e.preventDefault()
    const { email, password } = e.target

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          dispatch({ type: SETUSER, payload: data.user });
          return history.push('/')
        } else {
          alert('Failed to signup')
        }
      })
  }

  return (
    <div className="text-center">
      <h4 className="text-center m-4">Signing Up</h4>
      <form onSubmit={(e) => signup(e)} className="d-flex flex-column align-items-center">
        <div className="form-floating mb-3 w-25">
          <input
            name='email'
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
          <div id="emailHelp" className="form-text fs-8 fw-lighter">We'll never share your email with anyone else.</div>
        </div>
        <div className="form-floating mb-3 w-25">
          <input
            name='password'
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type='submit' className="btn btn-primary" >Sign Up</button>
      </form>
      <div>OR</div>
      <Link to='/signin' style={{textDecoration: 'none'}}>Sign In</Link>
    </div>
  );
}

export default SignUp;
