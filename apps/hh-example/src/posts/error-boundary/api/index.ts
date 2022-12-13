import ky from 'ky-universal'

export async function getTodoList(limit = 10, errorType: 'timeout' | 'network' | 'none' = 'none') {
  const data: { id: number }[] = await ky(`http://localhost:3000/api/error-test?errorType=${errorType}`, {
    // timeout: 100,
  }).json()
  return data.filter((x) => x.id <= limit)
}
