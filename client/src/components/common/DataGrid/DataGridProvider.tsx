import type { ChangeEvent, ReactElement } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { DataGridContextState } from './DataGridContext'
import { DataGridContext } from './DataGridContext'
import type { BaseItem, DataGridProviderProps } from './types'

const DataGridProvider = <T extends BaseItem = BaseItem>(props: DataGridProviderProps<T>): ReactElement => {
  const { children, ...contextProps } = props
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [currentDeleteId, setCurrentDeleteId] = useState<number | undefined>()
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const [showDeleteManyDialog, setShowDeleteManyDialog] = useState<boolean>(false)

  const handleSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { data } = props
      if (event.target.checked) {
        setSelectedRows(data?.items.map(({ id }) => Number(id)) ?? [])
        return
      }
      setSelectedRows([])
    },
    [props]
  )

  const contextValue: DataGridContextState<T> = useMemo(
    () => ({
      ...contextProps,
      currentDeleteId,
      handleSelectAll,
      selectedRows,
      setCurrentDeleteId,
      setSelectedRows,
      setShowDeleteDialog,
      setShowDeleteManyDialog,
      showDeleteDialog,
      showDeleteManyDialog,
    }),
    [
      contextProps,
      selectedRows,
      setSelectedRows,
      handleSelectAll,
      currentDeleteId,
      setCurrentDeleteId,
      setShowDeleteDialog,
      setShowDeleteManyDialog,
      showDeleteDialog,
      showDeleteManyDialog,
    ]
  )

  return <DataGridContext.Provider value={contextValue}>{children}</DataGridContext.Provider>
}

export default DataGridProvider
