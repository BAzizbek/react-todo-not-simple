import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Form from '../Form/Form'
import List from '../List/List'
import Nav from '../Nav/Nav'
import SignUp from '../Auth/SignUp';
import SignIn from '../Auth/SignIn';
import Completed from "../Completed/Completed";
import Edit from '../Edit/Edit'
import { useEffect } from 'react';
import { LOGOUT, SETUSER } from "../../redux/actionTypes/actionTypes";


function App() {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      if (token) {
        fetch('/auth', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
          },
        }).then(res => res.json())
          .then(data => data.message ? dispatch({ type: LOGOUT })
            : dispatch({ type: SETUSER, payload: data })
          )
      }
    } catch (e) {
      localStorage.removeItem('token')
    }

  }, [])


  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <List />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/add'>
          <Form />
        </Route>
        <Route path='/completed'>
          <Completed />
        </Route>
        <Route path='/edit/:id'>
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
