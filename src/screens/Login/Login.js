import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormText,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { ToastContainer, ToastStore } from "react-toasts";
import "./Login.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Create_Login } from '../../actions/AuthAction/LoginAction';
import { update_captcha } from '../../actions/AuthAction/LoginAction';
import { useHistory } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import captchaImg from '../../assets/captcha.png';
//import Error from "../Errors/Errors";
import Captcha, { isForwardRef } from "demos-react-captcha";
import { logoUrl } from '../../model';
import Loader from '../../components/loader';

function Login() {

  const initialvalue = { username: '', password: '', captchv: '' };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  //const [user, setUser] = React.useState({username:""});
  const [Iscaptcha, setcaptcha] = React.useState(false);
  const [captchavalue, setcaptchavalue] = useState();
  const characters = 'abc123';
  const dispatch = useDispatch();
  const history = useHistory();


  const onChangeText = (e) => {
    const { name, value } = e.target;
    //console.log('onchange',name,value);
    setForm({ ...isform, [name]: value });
  };

  const onChange = (value) => {
    console.log('value', value);
    if (value) {
      setcaptcha(true);
    }
    else {
      setcaptcha(false);
    }
  }

  //  let handleChange = (e) => {
  //    let name = e.target.name;
  //    let value = e.target.value;
  //    user[name] = value;
  //    setUser(user);
  // }


  // const onCheckCaptcha = e => {

  //   var element =  document.getElementById("succesBTN");
  //   var inputData = document.getElementById("inputType");
  //    element.style.cursor = "wait";
  //    element.innerHTML  = "Checking...";
  //    inputData.disabled = true;
  //    element.disabled = true;

  //     var myFunctions = function(){
  //         if(captcha == user.username)
  //         {
  //           element.style.backgroundColor   = "green";
  //           element.innerHTML  = "Captcha Verified";
  //           element.disabled = true;
  //           element.style.cursor = "not-allowed";
  //           inputData.style.display = "none";
  //           setcaptcha(true);
  //         }
  //         else
  //         {
  //           element.style.backgroundColor   = "red";
  //           element.style.cursor = "not-allowed";
  //           element.innerHTML  = "Not Matched";
  //           element.disabled = true;

  //           var myFunction = function(){
  //             element.style.backgroundColor   = "#007bff";
  //             element.style.cursor = "pointer";
  //             element.innerHTML  = "Verify Captcha";
  //             element.disabled = false;
  //             inputData.disabled = false;
  //             inputData.value ='sssss';
  //           };
  //           setTimeout(myFunction,3000);
  //         }
  //       }   
  //       setTimeout(myFunctions,3000); 
  // };


  const validateForm = (values) => {
    const err = {};
    if (!values.username) {
      err.username = "Username is Required"
    }
    if (!values.password) {
      err.password = "Password is Required"
    }
    if (!values.captchv) {
      err.captchv = "Captcha is requied"
    }
    return err;
  }

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
  }

  React.useEffect(() => {
    const generateString = (length) => {
      console.log('generateString func called');
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    const captcha = generateString(6);
    setcaptchavalue(captcha);
    dispatch(update_captcha({ captchav: captcha }));
  }, [])


  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const crediential = {
        username: isform.username.trim(),
        password: isform.password.trim(),
        captchavalue: isform.captchv.trim()

      }
      dispatch(Create_Login(crediential, history));
    }

  }, [formError])

  return (
    <>{Object.values(formError).length === 0 && Issubmit ? 
      <Loader/> : <div
      style={{ backgroundImage: "url(/images/Reliance-BP.jpg)" }}
      className="bg">
      <div className='center'>
          <CRow className="justify-content-center">

            <CCol md="14">

              {/* <center>
            <span className="h1" style={{ fontWeight: '1000', color: 'green' }}>CSI AMS</span>
            <span className="h1" style={{ fontWeight: '1000' }}>CENTRAL</span>
          </center> */}

              <CCardGroup>

                <CCard className="p-4" style={{ "backgroundColor": "white" }}>
                  <CCardBody>
                    { }
                    <ToastContainer
                      position={ToastContainer.POSITION.TOP_RIGHT}
                      store={ToastStore}
                    />

                    <CForm
                      //onSubmit={this.onSubmit} 
                      autoComplete="off">
                      <center>
                        <img src={logoUrl} alt="logopng" style={{ "width": "220px", "height": "auto" }} />
                      </center>
                      <h5 className='heading'
                      //style={{ color: '#01a757', fontsize:"19px"}}
                      >AMS Central Portal Login</h5><br></br>
                      {/* <p style={{ color: '#fff' }}>Please enter your Email &amp; password to login</p> */}

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text"
                          placeholder="Enter Username"
                          onChange={onChangeText}
                          name="username"
                          size="lg"
                        />
                      </CInputGroup>
                      <CFormText className="help-block text-danger" >
                        <p style={{ color: 'red' }}>
                          {formError.username}
                        </p>
                      </CFormText>

                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password"
                          placeholder="Enter PIN"
                          onChange={onChangeText}
                          name="password"
                          size="lg"
                        />

                      </CInputGroup>

                      <CFormText className="help-block text-danger" >
                        <p style={{ color: 'red' }}>
                          {formError.password}
                        </p>
                      </CFormText>

                      {/* <div className="App">
                    <Captcha onChange={onChange} placeholder="Enter captcha" />
                  </div> <br></br> */}

                      <CRow>

                        <CCol xs="14">
                          <div className="container">
                            <img src={captchaImg} className="mt-3 mb-3" height="50" />
                            <div className="centered"><h4 id="captcha">{captchavalue}</h4></div>

                          </div>
                        </CCol>
                      </CRow>
                      <CInputGroup className="mb-4">
                        <CInput type="password"
                          placeholder="Enter Captcha"
                          onChange={onChangeText}
                          name="captchv"
                          size="lg"
                        />
                      </CInputGroup>
                      <CFormText className="help-block text-danger" >
                        <p style={{ color: 'red' }}>
                          {formError.captchv}
                        </p>
                      </CFormText>
                      {/* <CRow>
                    <CCol>
                      <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha"
                        name="username"  onChange={handleChange} autocomplete="off"
                        />
                    </CCol>
                    
                  </CRow><br></br>
                  <CRow>
                    <center>
                  <CCol xs="14">
                      <button type="button" id="succesBTN" onClick={onCheckCaptcha} class="btn btn-primary">Verify Captcha</button>
                    </CCol></center>
                  </CRow><br></br> */}

                      <CRow>

                        <CCol xs="14">
                          <center>
                            <CButton
                              //disabled={!Iscaptcha}
                              onClick={submitform}
                              type="submit" color="success" size="lg">
                              <strong>Login</strong></CButton></center>
                        </CCol>
                      </CRow>
                      <br></br>
                      <CRow>
                        <CCol xs="5"></CCol>
                        <CCol xs="8"><h6 style={{ "color": "#01a757" }}>Powered by
                          <a href="http://csinc.in" style={{ "color": "#01a757" }} target="_blank" rel="noopener noreferrer"> CSI</a>
                        </h6></CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </div>
    </div>}</>
  );

}

export default Login;
