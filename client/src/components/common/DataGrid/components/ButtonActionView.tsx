import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import type { ReactElement } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { VIEW_URL_PATH } from '../data-grid.config'
import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem } from '../types'

interface ButtonActionViewProps<T> {
  item: T
}

const ButtonActionView = <T extends BaseItem>({ item }: ButtonActionViewProps<T>): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { viewAction } = useContext<DataGridContextState<T>>(DataGridContext)

  if (viewAction !== undefined && viewAction.onView !== undefined) {
    const { onView } = viewAction
    return (
      <IconButton color="primary" onClick={() => onView(item)}>
        <Visibility />
      </IconButton>
    )
  }

  const toUrl = `${viewAction?.toUrl ?? VIEW_URL_PATH}/${item.id}`

  return (
    <IconButton color="primary" component={Link} to={toUrl}>
      <Visibility />
    </IconButton>
  )
}

export default ButtonActionView
