import { apiAxios } from './src/requests'

export interface PageApi<T = any> {
  total: number
  list: T[]
}

export const AComment = {
  page: apiAxios('/comment/page'),
  replyPage: apiAxios('/comment/replyPage'),
  save: apiAxios('/comment/save', 'post'),
  liked: apiAxios('/comment/liked', 'post')
}

export * from './src/requests'
