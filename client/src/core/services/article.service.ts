/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { stringify } from 'qs'

import type { ArticleModel, FindAllResponse, SearchParams } from '../hooks/useArticleSearch'

export const ArticleService = {
  search: (params: SearchParams<Record<string, string>>) => {
    return axios.get<FindAllResponse<ArticleModel>>(`http://localhost:5003/articles/search`, {
      params,
      paramsSerializer: () => stringify(params),
    })
  },
}
