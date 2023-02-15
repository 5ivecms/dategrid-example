import type { SxProps } from '@mui/material'
import { Box, Pagination, Typography } from '@mui/material'
import type { ChangeEvent, ReactElement } from 'react'
import { useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem } from '../types'

export const paginationContainer: SxProps = {
  alignContent: 'center',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  py: 2,
  width: '100%',
}

export const paginationStat: SxProps = {
  mr: 2,
}

const DataGridTablePagination = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { data, setPage } = useContext<DataGridContextState<T>>(DataGridContext)

  if (!data) {
    return <></>
  }

  const { limit, page, total } = data

  const handleChange = (_: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage)
  }

  return (
    <Box sx={paginationContainer}>
      <Pagination
        color="primary"
        count={Math.ceil(total / limit)}
        onChange={handleChange}
        page={Number(page)}
        size="medium"
        showFirstButton
        showLastButton
      />
      <Box sx={paginationStat}>
        <Typography fontSize={14} fontWeight="bold">
          Всего: {total.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}

export default DataGridTablePagination
