import React, { useCallback, useMemo, useState } from 'react'
import { QuickSearchToolbar } from './DataGridTable'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import { deleteProducts, getAllProducts } from '../api'
import { setAllProducts } from '../context/reducers/productsReducer'
import { success, warn } from './AlertMessage'

const DashItems = () => {
  const dispatch = useDispatch()
  let products = useSelector((state) => state?.products?.state)

  useMemo(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
      })
    }
  }, [])

  if (!products || products.length === 0)
    products = [{ productId: 0, lastName: 'Blank', firstName: 'Black', age: 0 }]

  const deleteData = (id) => {
    console.log(id)
    let isExecuted = window.confirm('Are you sure want to delete it?')

    if (isExecuted) {
      deleteProducts(id)
      success('Product Deleted successfully')
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
      })
    } else {
      warn('Cannot delete product or canceled!')
    }
  }
  const editData = (id) => {
    console.log(id)
  }

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataGrid
        columns={[
          {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            flex: 0.1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => deleteData(params.id)}
              />,
              <GridActionsCellItem
                icon={<SecurityIcon />}
                label="Toggle Admin"
                onClick={() => editData(params.id)}
                showInMenu
              />,
            ],
          },
          {
            field: 'imageURL',
            headerName: 'Image',
            flex: 0.2,
            renderCell: (params) => {
              return (
                <img
                  src={params.value}
                  alt="Product"
                  className="product-img w-40"
                />
              )
            },
          },
          {
            field: 'product_name',
            headerName: 'Name',
            flex: 0.2,
            editable: false,
          },
          {
            field: 'product_category',
            headerName: 'Category',
            flex: 0.2,
            editable: false,
          },
          {
            field: 'product_price',
            headerName: 'Price',
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
              const price = Number(params.value).toFixed(2)
              return `$${price}`
            },
          },
          { field: 'productId', headerName: 'ID', flex: 0.1 },
        ]}
        rows={products}
        getRowId={(row) => row.productId}
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
    </div>
  )
}

export default DashItems
