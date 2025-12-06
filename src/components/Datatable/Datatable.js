import React from 'react'
import { CDataTable, CBadge, CButton, CCollapse, CCardBody } from '@coreui/react'
import "./Style.scss"

export const Datatable = (props) => {
  // Ensure data is always an array to prevent slice errors
  const safeData = Array.isArray(props.data) ? props.data : [];
  
  return (
    <CDataTable
      items={safeData}
      fields={props.Headfields}
      //columnFilter
      tableFilter
      //footer
      //itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      responsive={true}
      scopedSlots={props.scopedSlots}
      loading = {props.isLoading}
      fixedHeader={true}
    />
  )
}


