import { Paper } from '@mui/material'
import type { ReactElement } from 'react'
import { useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem } from '../types'
import DataGridDialogs from './DataGridDialogs/DataGridDialogs'
import DataGridLoader from './DataGridLoader/DataGridLoader'
import DataGridTable from './DataGridTable'

const DataGridContainer = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { isLoading, isFetching } = useContext<DataGridContextState<T>>(DataGridContext)

  return (
    <Paper sx={{ position: 'relative' }}>
      <DataGridTable />
      {(isLoading || isFetching) && <DataGridLoader />}
      <DataGridDialogs />
    </Paper>
  )
}

export default DataGridContainer
