import ky from 'ky-universal'

export async function getTodoList(limit = 10) {
  const data: { id: number }[] = await ky('https://jsonplaceholder.typicode.com/todos').json()
  return data.filter((x) => x.id <= limit)
}
