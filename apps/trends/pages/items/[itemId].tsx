import { useRouter } from "next/router"

export default function ItemDetailPage() {
  const router = useRouter()
  const { itemId } = router.query
  return <div>ItemDetail {itemId}</div>
}