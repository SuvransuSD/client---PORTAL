import React, { useState, useEffect } from "react";
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
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ToastContainer, ToastStore } from "react-toasts";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { Create_Login, update_captcha } from "../../actions/AuthAction/LoginAction";
import { useHistory } from "react-router-dom";
import captchaImg from "../../assets/captcha.png";
import Loader from "../../components/loader";

const DEMO_MODE = process.env.REACT_APP_DEMO_MODE === "true";

function Login() {
  const initialvalue = { username: "", password: "", captchv: "" };
  const [isform, setForm] = useState(initialvalue);
  const [formError, setformError] = useState({});
  const [Issubmit, setsubmit] = useState(false);

  const [captchavalue, setcaptchavalue] = useState("");
  const characters = "abc123";

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const validateForm = (values) => {
    // ✅ Demo mode: skip validation
    if (DEMO_MODE) return {};

    const err = {};
    if (!values.username) err.username = "Username is Required";
    if (!values.password) err.password = "Password is Required";
    if (!values.captchv) err.captchv = "Captcha is required";
    return err;
  };

 const submitform = (event) => {
  event.preventDefault();

  if (DEMO_MODE) {
    sessionStorage.setItem("token", JSON.stringify("demo-token"));
    sessionStorage.setItem("tokenExpiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    sessionStorage.setItem("user", "DEMO_USER");
    sessionStorage.setItem("role", "DEMO_ROLE");

    history.push("/Ams-Dashboard/Dashboard");
    return;
  }

  setformError(validateForm(isform));
  setsubmit(true);
};



  // ✅ Generate captcha only in real mode
  useEffect(() => {
    if (DEMO_MODE) return;

    const generateString = (length) => {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const captcha = generateString(6);
    setcaptchavalue(captcha);
    dispatch(update_captcha({ captchav: captcha }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Call real login only in real mode
  useEffect(() => {
    if (DEMO_MODE) return;

    if (Object.values(formError).length === 0 && Issubmit) {
      const crediential = {
        username: isform.username.trim(),
        password: isform.password.trim(),
        captchavalue: isform.captchv.trim(),
      };
      dispatch(Create_Login(crediential, history));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formError]);

  const showLoader = !DEMO_MODE && Object.values(formError).length === 0 && Issubmit;

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div style={{ backgroundImage: "url(/images/tata-bg.jpg)" }} className="bg">
          <div className="center">
            <CRow className="justify-content-center">
              <CCol md="14">
                <CCardGroup>
                  <CCard className="p-4" style={{ backgroundColor: "white" }}>
                    <CCardBody>
                      <ToastContainer
                        position={ToastContainer.POSITION.TOP_RIGHT}
                        store={ToastStore}
                      />

                      <CForm autoComplete="off" onSubmit={submitform}>
                        <center>
                          <img
                            src={"/images/Tata-logo.png"}
                            alt="logo"
                            style={{ width: "220px", height: "auto" }}
                          />
                        </center>

                        <h5 className="heading">AMS Central Portal Login</h5>
                        <br />

                   
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>

                          {/* ✅ FIX: this must be CInput (you had CInputGroup by mistake) */}
                          <CInput
                            type="text"
                            placeholder="Enter Username"
                            onChange={onChangeText}
                            name="username"
                            size="lg"
                          />
                        </CInputGroup>

                        {!DEMO_MODE && (
                          <CFormText className="help-block text-danger">
                            <p style={{ color: "red" }}>{formError.username}</p>
                          </CFormText>
                        )}

                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Enter PIN"
                            onChange={onChangeText}
                            name="password"
                            size="lg"
                          />
                        </CInputGroup>

                        {!DEMO_MODE && (
                          <CFormText className="help-block text-danger">
                            <p style={{ color: "red" }}>{formError.password}</p>
                          </CFormText>
                        )}

                        {/* ✅ Captcha only for real mode */}
                        {!DEMO_MODE && (
                          <>
                            <CRow>
                              <CCol xs="14">
                                <div className="container">
                                  <img
                                    src={captchaImg}
                                    alt="captcha"
                                    className="mt-3 mb-3"
                                    height="50"
                                  />
                                  <div className="centered">
                                    <h4 id="captcha">{captchavalue}</h4>
                                  </div>
                                </div>
                              </CCol>
                            </CRow>

                            <CInputGroup className="mb-4">
                              <CInput
                                type="password"
                                placeholder="Enter Captcha"
                                onChange={onChangeText}
                                name="captchv"
                                size="lg"
                              />
                            </CInputGroup>

                            <CFormText className="help-block text-danger">
                              <p style={{ color: "red" }}>{formError.captchv}</p>
                            </CFormText>
                          </>
                        )}

                        <CRow>
                          <CCol xs="14">
                            <center>
<CButton className="loginBtn" type="submit" size="lg">
  <strong>{DEMO_MODE ? "Continue" : "Login"}</strong>
</CButton>

                            </center>
                          </CCol>
                        </CRow>

                        <br />

                        <CRow>
                          <CCol xs="12" className="text-center">
                            <h6 className="poweredBy">
                              Developed by
                            </h6>
                            <div className="csi-logo-container">
                              <a href="http://csinc.in" target="_blank" rel="noopener noreferrer">
                                <img 
                                  src="/images/csilogo.png" 
                                  alt="CSI Logo" 
                                  className="csi-logo"
                                  style={{
                                    maxWidth: '120px',
                                    height: 'auto',
                                    marginTop: '8px',
                                    transition: 'transform 0.2s ease'
                                  }}
                                />
                              </a>
                            </div>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
