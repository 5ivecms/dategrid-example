/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { grey } from '@mui/material/colors'
import { visuallyHidden } from '@mui/utils'
import { flexRender, HeaderGroup } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import { useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem, LEGAL_ANY } from '../types'

interface DataGridTableHeadProps<T extends BaseItem = BaseItem> {
  headerGroups: HeaderGroup<T>[]
}

const DataGridTableHead = <T extends BaseItem>({ headerGroups }: DataGridTableHeadProps<T>): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { order, orderBy, setOrderBy, setOrder } = useContext<DataGridContextState<T>>(DataGridContext)

  const onSort = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)
  }

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => {
        return (
          <TableRow key={headerGroup.id} sx={{ backgroundColor: grey[100] }}>
            <TableCell />
            {headerGroup.headers.map((header) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              const orderKey = (header.column.columnDef as LEGAL_ANY).accessorKey as string
              return (
                <TableCell
                  {...{
                    colSpan: header.colSpan,
                    key: header.id,
                    style: { width: header.getSize() },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === orderKey}
                    direction={orderBy === orderKey ? order : 'asc'}
                    onClick={onSort(orderKey)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {header.isPlaceholder ? undefined : flexRender(header.column.columnDef.header, header.getContext())}
                    {orderBy === orderKey ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : (
                      <></>
                    )}
                  </TableSortLabel>
                </TableCell>
              )
            })}
            <TableCell />
          </TableRow>
        )
      })}
    </TableHead>
  )
}

export default DataGridTableHead
