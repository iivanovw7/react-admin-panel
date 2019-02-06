import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, } from 'react-router-dom';
import Profile from './screens/Profile/Profile.js';
import Users from './screens/Users/Users.js';
import './styles/main.sass'
import Store from './store/index'
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import { AUTHENTICATED } from './constants/ActionTypes';
import requireAuth from './components/authentication/require_auth';
import noRequireAuth from './components/authentication/no_require_auth';
import 'babel-polyfill';

const store = Store();

const user = localStorage.getItem('user'); //check if user exists
const mountPoint = document.querySelector('.container'); //getting mount point

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={noRequireAuth(Signin)}/>
        <Route path="/signin" component={noRequireAuth(Signin)}/>
        <Route path="/signup" component={noRequireAuth(Signup)}/>
        <Route path="/profile" component={requireAuth(Profile)} />
        <Route path="/users" component={requireAuth(Users)} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , mountPoint);

