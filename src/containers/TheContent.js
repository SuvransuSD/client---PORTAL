import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CCol, CContainer, CFade, CRow } from '@coreui/react'
import { useHistory } from "react-router-dom";


// routes config
import routes from '../routes'
import TheSidebar from './TheSidebar'
import "./sidebar.scss"
import { faIgloo, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({ theprop }) => {

  const [istokenexp, settokenexp] = React.useState(false);
  const gettoken = sessionStorage.getItem('token');
  const tokenExpiry = sessionStorage.getItem('tokenExpiry');

  React.useEffect(() => {
    // console.log('Current datetime-->',Date.now());
    // console.log('Token expire time-->',tokenExpiry*1000);
    if ((tokenExpiry * 1000 != 0) && (Date.now() > tokenExpiry * 1000)) {
      console.log('Token expired');
      settokenexp(true);
      alert('Session Expired! Redirecting to Login Page');
      sessionStorage.clear();
    } else {
      //console.log('Token not expired');
    }
  }, [])


  let history = useHistory();

  let currentLocation = history.location.pathname


  return (
    <main style={{ "backgroundColor": "white" }}>


      <CRow>
        {currentLocation.match("/Ams-Configuration") ? null : <CCol lg={3}>
          <TheSidebar routes={theprop} />
        </CCol>}

        <CCol lg={currentLocation.match("/Ams-Configuration") ? 14 : 11} className="p-3" >
          <Suspense fallback={loading}>

            <Switch>


              {
                // gettoken && (istokenexp === false) ?
                gettoken ?

                  routes.map((route, idx) => {
                    return route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <CFade>
                            <route.component {...props} />
                          </CFade>
                        )} />
                    )
                  })

                  :

                  <Redirect from={theprop.history.location.pathname} to="/login" />

              }


            </Switch>
          </Suspense>

        </CCol>
      </CRow>
    </main>
  )
}

export default React.memo(TheContent)
