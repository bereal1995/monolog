import { useRouter } from "next/router"

/**
 * @return 현재 페이지 itemId 파라미터 값
 */
export function useItemId() {
  const router = useRouter()
  const itemId = router.query.itemId as string
  const parsed = itemId ? parseInt(itemId) : null

  if (parsed && Number.isNaN(parsed)) return null
  return parsed
}
