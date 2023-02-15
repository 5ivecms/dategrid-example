import type { MUIDataTableOptions } from 'mui-datatables'

export const ACTION_BUTTONS_FIELD = 'actionButtons'

export const DEFAULT_LIMIT = 10

export const VIEW_URL_PATH = 'view'
export const EDIT_URL_PATH = 'edit'

export const defaultOptions: MUIDataTableOptions = {
  filter: false,
  search: false,
  searchAlwaysOpen: false,
  searchOpen: false,
  searchText: undefined,
}
