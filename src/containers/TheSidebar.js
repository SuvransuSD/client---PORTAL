import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CCollapse } from '@coreui/react'
// sidebar nav config
import navigation from './_nav'
import "./sidebar.scss"
import { Link } from 'react-router-dom'
import { AmsDashboard, MasterData, PortalManagement, AmsUsers } from './Sidebar.routes'

const TheSidebar = (props) => {
  const pathname = props.routes.location.pathname;
  const [isparams, setparams] = React.useState([])
  //console.log(props.routes.location.pathname);

  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  React.useEffect(() => {
    return getBadge()
  }, [pathname])



  const getBadge = () => {
    //console.log('pathname', pathname);


    if (pathname.search("Portal-Management") === 1) {
      return setparams(PortalManagement)
    }

    if (pathname.search("Master-Data") === 1) {
      return setparams(MasterData)
    }

    if (pathname.search("Ams-Dashboard") === 1) {
      //const All = AmsDashboard.concat(MasterData)
      return setparams(AmsDashboard)
    }

    else {
      return setparams([]);
    }

  }

  const [collapse, setCollapse] = React.useState(false);

  const toggle = (e) => {
    setCollapse(!collapse);
    console.log('key', collapse);
    e.preventDefault();
  }



  return (
    <div className='sidebarline pt-4'>
      {
        isparams && isparams.map((data, index) => {
          return (

            <ul>
              <Link to={data.link} className={data.link == pathname ? "text-success" : "text-dark"} key={index}>
                <h6 onClick={data.label == 'AMS Users Report' ? toggle : null}>
                  {data.label}
                </h6>
              </Link>
              {
                data && data.submenu && data.submenu.length !== 0 && data.submenu.map((dt) => (
                  <CCollapse
                    id={index}
                    show={collapse}
                  >
                    <li>
                      <Link to={dt.link} className={dt.link == pathname ? "text-success" : "text-dark"} key={index}>
                        <p className='caret'>
                          - {dt.label}
                        </p>
                      </Link>
                    </li>
                  </CCollapse>
                ))
              }
            </ul>

          )

        })
      }
    </div>
  )
}

export default React.memo(TheSidebar)
