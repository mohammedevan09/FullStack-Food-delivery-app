import React, { useState } from 'react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'

export function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        color: 'white',
      }}
    >
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </Box>
  )
}

const DataGridTable = ({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
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

export default DataGridTable
