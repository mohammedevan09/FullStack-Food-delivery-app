import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../api'
import { setAllUser } from '../context/reducers/allUserReducer'
import { DataGrid } from '@mui/x-data-grid'
import { QuickSearchToolbar } from './DataGridTable'

const DashUsers = () => {
  const dispatch = useDispatch()
  let users = useSelector((state) => state.allUser)

  if (!users) {
    getAllUsers().then((data) => {
      dispatch(setAllUser(data))
    })
  }

  if (!users || users.length === 0) {
    users = [
      {
        photoURL:
          'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png',
        displayName: 'Blank',
        email: 'Blank',
        emailVerified: 'Blank',
        uid: 'Wb2bSKqfSZLKvOaZpQeVO7sB2',
      },
    ]
  }

  const columns = [
    {
      field: 'photoURL',
      headerName: 'Image',
      flex: 0.4,
      renderCell: (params) => {
        return (
          <img
            src={
              params.value
                ? params.value
                : 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png'
            }
            alt="Product"
            className="product-img w-10 rounded-full"
          />
        )
      },
    },
    {
      field: 'displayName',
      headerName: 'Name',
      flex: 0.7,
      editable: false,
      renderCell: (params) => {
        // console.log(params)
        if (params.formattedValue == undefined) {
          return 'No name'
        } else {
          return params.formattedValue
        }
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.7,
      editable: false,
    },
    {
      field: 'emailVerified',
      headerName: 'Verified',
      flex: 0.5,
      editable: false,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      renderCell: (params) => {
        // console.log(params)
        return (
          <div
            className={`${
              params.row.emailVerified ? 'bg-green-500' : 'bg-red-500'
            } font-semibold px-5 py-2 align-left`}
          >
            {params.row.emailVerified ? 'Verified' : 'Not verified'}
          </div>
        )
      },
    },
  ]

  return (
    <DataGrid
      rows={users}
      columns={columns}
      getRowId={(row) => row?.uid}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5, 10, 25]}
      disableRowSelectionOnClick
      slots={{ toolbar: QuickSearchToolbar }}
    />
  )
}

export default DashUsers
