import axiosInstance from "../../utils/axiosInstance";
import { AUTH_LOGIN, UPDATE_LOGIN_ATTEMPTS, CAPTCHA_VALUE } from "../types";
var uri = "/api/auth/"


// actions 
export const Create_Login = (crediential, history) => dispatch => {
  console.log(crediential);
  const MYURL = uri + 'login';
  axiosInstance.post(MYURL, crediential).then((result) => {
    console.log("result", result.data);
    if (result.status) {
      sessionStorage.setItem('token', JSON.stringify(result.data.tokens.access));
      sessionStorage.setItem('tokenExpiry', result.data.tokens.access.expires);
      sessionStorage.setItem('user', result.data.user.userName);
      sessionStorage.setItem('role', result.data.user.roles);
      dispatch({
        type: AUTH_LOGIN,
        payload: result.data
      });
    }
  })
    .then(() => {
      //alert('Signin Successfully');
      history.push('/Ams-Dashboard/Dashboard');

    })
    .catch((err) => {
      console.log("error : ", err.toString());
      
      if (err.response && err.response.status === 401) {
        alert('Incorrect Username, Password or Captcha');
        setTimeout(() => window.location.reload(), 3000);
      } else if (err.response && err.response.status === 429) {
        alert('Too many login attempts - Login after 15 minutes');
        setTimeout(() => window.location.reload(), 3000);
      } else if (err.response && err.response.status === 409) {
        alert('Incorrect captcha entered!');
        setTimeout(() => window.location.reload(), 3000);
      } else {
        alert('Login failed. Please check your connection and try again.');
        console.error('Login error:', err);
      }

      dispatch({
        type: UPDATE_LOGIN_ATTEMPTS,
        payload: err
      });
    })

}

export const update_captcha = (captcha) => dispatch => {
  const MYURL = uri + 'update_captcha';
  axiosInstance.post(MYURL, captcha).then((result) => {
    if (result.status) {
      dispatch({
        type: CAPTCHA_VALUE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

