/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Table, TableBody, TableContainer } from '@mui/material'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { MouseEvent, ReactElement } from 'react'
import { useCallback, useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem } from '../types'
import DataGridFilter from './DataGridFilter'
import { DataGridPagination } from './DataGridPagination'
import DataGridRow from './DataGridRow/DataGridRow'
import DataGridTableHead from './DataGridTableHead'

const DataGridTable = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { columns, data, selectedRows, setSelectedRows } = useContext<DataGridContextState<T>>(DataGridContext)

  const table = useReactTable({
    columns,
    data: data?.items ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  const isSelected = useCallback((id: number) => selectedRows.includes(id), [selectedRows])

  const onSelectRow = useCallback(
    (id: number) => (_: MouseEvent<HTMLButtonElement>) => {
      setSelectedRows((prevState) => {
        if (!prevState.includes(id)) {
          return [...prevState, id]
        }
        return prevState.filter((item) => item !== id)
      })
    },
    [setSelectedRows]
  )

  return (
    <TableContainer>
      <Table>
        <DataGridTableHead headerGroups={table.getHeaderGroups()} />
        <DataGridFilter />
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const selected = isSelected(Number(row.original.id))
            return <DataGridRow key={row.id} onSelectRow={onSelectRow} row={row} selected={selected} />
          })}
        </TableBody>
      </Table>
      <DataGridPagination />
    </TableContainer>
  )
}

export default DataGridTable
