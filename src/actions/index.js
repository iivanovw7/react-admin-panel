import * as types from '../constants/ActionTypes'
import axios from 'axios';

export const URL = '/api';

export function signInAction({email, password}, history) {

    //action creator dispatches if correct response received from API
    //if correct response received => saving new token and userType in localStorage
    return async (dispatch) => {
      try {
        const res = await axios.post(`${URL}/signin`, {email, password});

        dispatch({
          type: types.AUTHENTICATED
        });


        localStorage.setItem('user', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('userType', res.data.superuser);

        history.push('/profile'); //redirecting user to default page
      }
      catch (error) {
        console.log('error');

        //return error message as a payload
        dispatch({
          type: types.AUTHENTICATION_ERROR,
          payload: 'Указан неверный пароль или Email'
        });
      }
    };

}


//create new user
export function signUpAction(options) {

  let password = options.password;
  let email = options.email;
  let name = options.name;
  let superuser = options.superuser;
  let token = options.token;

  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/signup`, {name, email, password, superuser, token});

      dispatch({
        type: types.REGISTRATION_SUCCESS,
        payload: res.data
      });

      console.log(res.data.message)

    }
    catch (error) {
      console.log('error');

      dispatch({
        type: types.REGISTRATION_ERROR,
        payload: 'Произошла ошибка, повторите запрос позже.'
      });
    }
  };
}

export function vk_login(name, vk_id, history) {

  return async (dispatch) => {
    try {

      const res = await axios.post(`${URL}/vk_signin`, {name, vk_id});

      dispatch({
        type: types.AUTHENTICATED,
      });

      localStorage.setItem('user', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('userType', res.data.superuser);

      history.push('/profile'); //redirecting user to default page
    }
    catch (error) {
      console.log('error');

      //return error message as a payload
      dispatch({
        type: types.AUTHENTICATION_ERROR,
        payload: 'Произошла ошибка, повторите запрос позже.'
      });
    }
  }
}

//handle user sign in action VIA VK API
export function handleVKLogin(history) {


  return function(dispatch) {
    dispatch({
      type: types.VK_LOGIN_REQUEST,
    });

    //eslint-disable-next-line no-undef
    VK.Auth.login(r => {
      if (r.session) {
        let name = r.session.user.first_name + ' ' + r.session.user.last_name;
        let vk_id = r.session.user.id;

        dispatch(
          //calls sign in with data received from VK API
          vk_login(name, vk_id, history)
        );

      } else {
        dispatch({
          type: types.VK_LOGIN_FAIL,
          error: true,
          payload: new Error('Произошла ошибка, повторите запрос позже.'),
        })
      }
    })
  }
}



//fetch all user data from API
export function fetchUsers() {

  //get data from server application
  return function(dispatch) {
    axios.get(`${URL}/users?token=${encodeURIComponent(localStorage.getItem('user'))}`)
      .then((res) => {

        dispatch({
          type: types.FETCH_USERS,
          payload: res
        });

      })
  };
}


//Signout current user
export function signOutAction() {

  localStorage.clear(); //remove user data

  return {
    type: types.UNAUTHENTICATED
  };
}

