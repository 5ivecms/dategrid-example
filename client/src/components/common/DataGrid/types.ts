import type { ColumnDef } from '@tanstack/react-table'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LEGAL_ANY = any

export type Order = 'asc' | 'desc'
export type Search = Record<string, string>
export type SetSearch = Dispatch<SetStateAction<Search>>
export type SetOrder = Dispatch<SetStateAction<Order>>
export type SetOrderBy = Dispatch<SetStateAction<string>>
export type SetPage = Dispatch<SetStateAction<number>>

export type BaseItem = { id: number }

export type ToUrl = {
  toUrl?: string
}

export type DeleteAction = {
  confirm?: boolean
  onDelete?: (dataIndex: number) => void
}

export type ViewAction<T extends BaseItem> = ToUrl & {
  onView?: (data: T) => void
}

export type EditAction<T extends BaseItem> = ToUrl & {
  onEdit?: (data: T) => void
}

export interface ActionCellOptions<T extends BaseItem = BaseItem> {
  deleteAction?: DeleteAction
  editAction?: EditAction<T>
  viewAction?: ViewAction<T>
}

export type SearchOptions = {
  order: Order
  orderBy: string
  page: number
  search: Search
  setOrder: SetOrder
  setOrderBy: SetOrderBy
  setPage: SetPage
  setSearch: SetSearch
}

export interface SelectOption {
  label: string
  value: string
}

export interface AsyncSelectOptions {
  loadOptions: (term: string) => Promise<{ label: string; value: string }[]>
}

export type FilterType = 'asyncSelect' | 'number' | 'select' | 'text'

export interface DataGridFilterDef<T extends BaseItem> {
  asyncSelectOptions?: AsyncSelectOptions
  name: string | keyof T
  options?: SelectOption[]
  placeholder?: string
  type: FilterType
}

export interface DataGridColumn<T extends BaseItem = BaseItem> {
  label: string
  name: keyof T
}

export interface DataGridProps<T extends BaseItem = BaseItem> extends SearchOptions, ActionCellOptions<T> {
  columns: ColumnDef<T, LEGAL_ANY>[]
  data?: { items: T[]; limit: number; page: number; total: number }
  filters?: DataGridFilterDef<T>[]
  isFetching?: boolean
  isLoading?: boolean
  onDelete?: (id: number) => void
  onDeleteMany?: (ids: number[]) => void
}

export interface DataGridProviderProps<T extends BaseItem = BaseItem> extends DataGridProps<T> {
  children: ReactNode
}
