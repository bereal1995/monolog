import ky from 'ky-universal'

export async function getTodoList(limit = 10) {
  const data: { id: number }[] = await ky('http://localhost:3000/api/error-test', {
    timeout: 100,
  }).json()
  return data.filter((x) => x.id <= limit)
}
