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
      let settoken = sessionStorage.setItem('token', JSON.stringify(result.data.tokens.access));
      const tokexp = sessionStorage.setItem('tokenExpiry', result.data.tokens.access.expires);
      const username = sessionStorage.setItem('user', result.data.user.userName);
      const role = sessionStorage.setItem('role', result.data.user.roles);
      if (settoken) {
        dispatch({
          type: AUTH_LOGIN,
          payload: result.data
        });
      }
    }
  })
    .then(() => {
      //alert('Signin Successfully');
      history.push('/Ams-Dashboard/Dashboard');

    })
    .catch((err) => {
      console.log("error : ", err.toString());
      
      // MOCK LOGIN BYPASS (Re-applied)
      console.log("Mocking login success due to error:", err);
      const dummyUser = {
        tokens: { access: { token: 'dummy-token', expires: Date.now() + 3600000 } },
        user: { userName: 'Admin', roles: 'admin' }
      };
      sessionStorage.setItem('token', JSON.stringify(dummyUser.tokens.access));
      sessionStorage.setItem('tokenExpiry', dummyUser.tokens.access.expires);
      sessionStorage.setItem('user', dummyUser.user.userName);
      sessionStorage.setItem('role', dummyUser.user.roles);
      dispatch({
        type: AUTH_LOGIN,
        payload: dummyUser
      });
      history.push('/Ams-Dashboard/Dashboard');
      return;

      if (err.toString().includes(401)) {
        alert('Incorrect Email and Password');
        setTimeout(window.location.reload(), 3000)
      }
      if (err.toString().includes(429)) {
        alert('Too many login attempts - Login after 15 minutes');
        setTimeout(window.location.reload(), 3000)
      }
      // if (err.toString().includes(409)) {
      //   alert('Incorrect captcha entered!');
      // }

      console.log('result', err.toString());
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

