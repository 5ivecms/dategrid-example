import { Delete } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import type { ReactElement } from 'react'
import { useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { ActionCellOptions, BaseItem } from '../types'
import ButtonActionEdit from './ButtonActionEdit'
import ButtonActionView from './ButtonActionView'

export interface ActionsCellProps<T extends BaseItem = BaseItem> extends ActionCellOptions<T> {
  item: T
}

const ActionsCell = <T extends BaseItem>({ item }: ActionsCellProps<T>): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { onDelete, setCurrentDeleteId, setShowDeleteDialog } = useContext<DataGridContextState<T>>(DataGridContext)

  const handleDelete = (): void => {
    setCurrentDeleteId(item.id)
    setShowDeleteDialog(true)
  }

  return (
    <Stack direction="row" spacing={0}>
      <ButtonActionView item={item} />
      <ButtonActionEdit item={item} />
      {onDelete !== undefined && (
        <IconButton color="error" onClick={handleDelete}>
          <Delete />
        </IconButton>
      )}
    </Stack>
  )
}

export default ActionsCell
