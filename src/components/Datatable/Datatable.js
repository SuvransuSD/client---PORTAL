import React from 'react'
import { CDataTable, CBadge, CButton, CCollapse, CCardBody } from '@coreui/react'
import "./Style.scss"

export const Datatable = (props) => {
  return (
    <CDataTable
      items={props.data}
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


