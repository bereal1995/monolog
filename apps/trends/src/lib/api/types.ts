interface Pagination<T> {
  list: T[]
  totalCount: number
  pageInfo: PageInfo
}

export type GetItemsResult = Pagination<Item>
export interface Item {
  id: number
  title: string
  body: string
  link: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  author: string
  publisher: Publisher
  user: User
  itemStats: ItemStats
  isLiked: boolean
  isBookmarked: boolean
}

export interface ItemStats {
  id: number
  likes: number
  commentsCount: number
}
export interface Publisher {
  id: number
  name: string
  domain: string
  favicon: string | null
}

export interface User {
  id: string
  username: string
  authId: string
}

export interface PageInfo {
  nextOffset?: number | null
  endCursor?: number | null
  hasNextPage: boolean
}

export interface LikeItemResult {
  id: number
  itemStats: ItemStats
  isLiked: boolean
}

export interface Comment {
  id: number
  text: string
  createdAt: string
  updatedAt: string
  likes: number
  subCommentsCount: number
  user: User
  mentionUser: User | null
  subComments?: Comment[]
  isLiked: boolean
  isDeleted: boolean
}

export interface LikeCommentResult {
  id: number
  likes: number
}
export interface UnlikeCommentResult {
  id: number
  likes: number
}

export interface SearchResultItem {
  id: number
  link: string
  publisher: Publisher
  author: null
  highlight: Highlight
  title: string
  body: string
  likes: number
}

export interface Highlight {
  title: string
  body: string
}

export type SearchItemsResult = Pagination<SearchResultItem>

export type ListMode = 'recent' | 'trending' | 'past'

export type GetBookmarksResult = Pagination<Bookmark>
export interface Bookmark {
  id: number
  item: Item
  createdAt: string
}
