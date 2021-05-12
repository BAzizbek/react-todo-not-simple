import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from "../../redux/actionTypes/actionTypes";

function SignOut(props) {

  const dispatch = useDispatch()

  function signout() {
    return dispatch({ type: LOGOUT })
  }
  return (
    <div>
      <button type='submit' className="btn btn-outline-primary ms-5 me-2" onClick={() => signout()}>Log out</button>
    </div>
  );
}

export default SignOut;
