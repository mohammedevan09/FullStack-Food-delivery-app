import React from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DataGridTable from './DataGridTable'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import { warn } from './AlertMessage'

const DashOrders = () => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 0.7,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 0.7,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 0.3,
      editable: false,
      type: 'number',
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 0.8,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => warn('Cannot perform any action!')}
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Admin"
          onClick={() => warn('Cannot perform any action!')}
          showInMenu
        />,
      ],
    },
  ]

  let rows = []
  if (rows.length === 0)
    rows = [{ id: 0, lastName: 'Blank', firstName: 'Blank', age: 0 }]

  return (
    <div className="grid items-center justify-center gap-4 pt-6 text-white">
      <DataGridTable rows={rows} columns={columns} />
    </div>
  )
}

export default DashOrders
