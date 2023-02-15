/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
import { createColumnHelper } from '@tanstack/react-table'
import type { FC } from 'react'
import { useCallback } from 'react'

import { DataGrid } from '../../components/common/DataGrid'
import type { DataGridFilterDef } from '../../components/common/DataGrid/types'
import { getRelations } from '../../components/common/DataGrid/utils'
import { useArticleSearch } from '../../core/hooks'
import { AdminLayout } from '../../layouts'

interface CategoryModel {
  id: number
  title: string
}

interface ArticleModel {
  categories: any
  id: number
  title: string
}

const columnHelper = createColumnHelper<ArticleModel>()

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: () => 'ID',
    minSize: 200,
    size: 200,
  }),
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: () => 'Название',
    size: 1000,
  }),
  columnHelper.accessor('categories.id', {
    cell: ({ row }) => {
      return row.original.categories.map((category: CategoryModel) => (
        <div key={`${row.original.id}${category.id}`}>{category.title}</div>
      ))
    },
    header: () => 'Название',
    size: 1000,
  }),
]

const filters: DataGridFilterDef<ArticleModel>[] = [
  { name: 'id', placeholder: 'id', type: 'text' },
  { name: 'title', placeholder: 'Название', type: 'text' },
  { name: 'categories.id', placeholder: 'Категория', type: 'text' },
  { name: 'categories.tags.id', placeholder: 'Категория', type: 'text' },
]

/*

{
  "categories.id": 1.
  "categories.tags.id": 2
}

{
  categories: {
    id: 1,
    tags: {
      id: 1
    }
  }
}
*/

const HomePage: FC = () => {
  const handleDelete = useCallback((id: number) => {
    console.log(id)
  }, [])

  const handleDeleteMany = useCallback((ids: number[]) => {
    console.log(ids)
  }, [])

  return (
    <AdminLayout>
      <DataGrid
        columns={columns}
        filters={filters}
        onDelete={handleDelete}
        onDeleteMany={handleDeleteMany}
        {...useArticleSearch(getRelations(filters))}
      />
    </AdminLayout>
  )
}

export default HomePage
