import React, { useEffect } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import ChartSales30days from './ChartSales30days'
import { useDashboard } from '../../hooks/useDashboard'

const DashboardTwo = () => {
  const { getSales30Days, dataDetalle, loading } = useDashboard()
  useEffect(() => {
    getSales30Days()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <div className="p-2">
          <span>Ventas los ultimos 30 dias</span>
          {dataDetalle && (
            <ChartSales30days
              data={dataDetalle.map((c) => {
                return {
                  time: new Date(c.key).toISOString().split('T')[0],
                  value: c.doc_count,
                }
              })}
            />
          )}
        </div>
      </CCard>
    </>
  )
}

export default DashboardTwo
