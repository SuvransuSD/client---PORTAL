import React from 'react'
import {
  TheContent,
  // TheSidebar,
  TheFooter,
  TheHeader
} from './index'


const TheLayout = (props) => {
  return (
    <div >
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">

          <TheContent theprop={props} />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout