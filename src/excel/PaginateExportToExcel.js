import React from 'react'
import { Button } from 'antd'

export const PaginateExportToExcel = ({ status, onClick }) => {
  return (
    <Button
      style={{
        backgroundColor: 'var(--primary-color)',
        color: 'var(--white-color)',
        borderRadius: '5px',
      }}
      onClick={onClick}
    >
      {status ? 'Loading' : 'စာရင်းထုတ်မည်'}
    </Button>
  )
}
