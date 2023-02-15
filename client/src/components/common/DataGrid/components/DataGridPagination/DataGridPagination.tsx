import { Box, Pagination, Typography } from '@mui/material'
import type { ReactElement } from 'react'
import { useCallback, useContext } from 'react'

import { DEFAULT_LIMIT } from '../../data-grid.config'
import type { DataGridContextState } from '../../DataGridContext'
import { DataGridContext } from '../../DataGridContext'
import type { BaseItem } from '../../types'
import { container, statistic } from './styles.sx'

const DataGridPagination = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { data, setPage } = useContext<DataGridContextState<T>>(DataGridContext)

  const total = data?.total || 0
  const limit = data?.limit || DEFAULT_LIMIT
  const page = data?.page || 1

  const count = Math.ceil(total / limit)

  const onPageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(Number(newPage))
    },
    [setPage]
  )

  return (
    <Box sx={container}>
      <Pagination
        color="primary"
        count={count}
        onChange={onPageChange}
        page={page}
        size="medium"
        showFirstButton
        showLastButton
      />
      <Box sx={statistic}>
        <Typography fontSize={14}>Всего: {total.toLocaleString()}</Typography>
      </Box>
    </Box>
  )
}

export default DataGridPagination
