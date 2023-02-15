/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import type { UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'

import type { Order, Search, SearchOptions } from '../../components/common/DataGrid/types'
import { ArticleService } from '../services/article.service'
import { useDebounce } from './useDebounce'

export interface FindAllResponse<I> {
  items: I[]
  limit: number
  page: number
  total: number
}

export interface SearchParams<S> {
  order?: Order
  orderBy?: string
  page?: number
  relations?: object
  search?: S
}

export interface CategoryModel {
  id: number
  title: string
}

export interface ArticleModel {
  categories: CategoryModel[]
  id: number
  title: string
}

type UseTrackSearch = SearchOptions & UseQueryResult<FindAllResponse<ArticleModel>>

export const useArticleSearch = (relations?: object): UseTrackSearch => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Search>({})
  const debouncedSearch = useDebounce<Search>(search, 500)
  const { enqueueSnackbar } = useSnackbar()

  const queryData = useQuery(
    ['articles search list', page, order, orderBy, debouncedSearch, relations],
    () => ArticleService.search({ order, orderBy, page, relations, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: () => {
        enqueueSnackbar('Ошибка при получении списка треков', {
          variant: 'error',
        })
      },
      select: ({ data }) => data,
    }
  )

  return useMemo(
    () => ({
      ...queryData,
      order,
      orderBy,
      page,
      search,
      setOrder,
      setOrderBy,
      setPage,
      setSearch,
    }),
    [queryData, page, setPage, order, setOrder, orderBy, setOrderBy, search, setSearch]
  )
}
