import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Item {
  userId: number
  id: number
  title: string
  body: string
}

const fetchPosts = async (limit = 10) => {
  const parsed = await axios.get<Item[]>('https://jsonplaceholder.typicode.com/posts')
  const result = parsed.data.filter((x: Item) => x.id <= limit)

  return result
}

const usePosts = (limit: number) => {
  return useQuery(['posts', limit], () => fetchPosts(limit))
}

export { usePosts, fetchPosts }
