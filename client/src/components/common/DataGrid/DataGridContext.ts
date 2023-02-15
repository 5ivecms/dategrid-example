/* eslint-disable @typescript-eslint/no-empty-function */
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

import type { BaseItem, DataGridProps, LEGAL_ANY, Order } from './types'

export type DataGridContextState<T extends BaseItem = BaseItem> = DataGridProps<T> & {
  currentDeleteId: number | undefined
  handleSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  selectedRows: number[]
  setCurrentDeleteId: Dispatch<SetStateAction<number | undefined>>
  setSelectedRows: Dispatch<SetStateAction<number[]>>
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>
  setShowDeleteManyDialog: Dispatch<SetStateAction<boolean>>
  showDeleteDialog: boolean
  showDeleteManyDialog: boolean
}

const defaultState = {
  columns: [],
  currentDeleteId: undefined,
  data: {
    items: [],
    limit: 10,
    page: 1,
    total: 0,
  },
  filters: [],
  handleSelectAll: () => {},
  isFetching: true,
  isLoading: true,
  onDelete: () => {},
  onDeleteMany: () => {},
  order: 'desc' as Order,
  orderBy: 'id',
  page: 1,
  search: {},
  selectedRows: [],
  setCurrentDeleteId: () => {},
  setOrder: () => {},
  setOrderBy: () => {},
  setPage: () => {},
  setSearch: () => {},
  setSelectedRows: () => {},
  setShowDeleteDialog: () => {},
  setShowDeleteManyDialog: () => {},
  showDeleteDialog: false,
  showDeleteManyDialog: false,
}

export const DataGridContext = createContext<DataGridContextState<LEGAL_ANY>>(defaultState)
