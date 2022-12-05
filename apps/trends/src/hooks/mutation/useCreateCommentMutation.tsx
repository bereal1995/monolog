import { useMutation } from '@tanstack/react-query'

import { useMutationOptionsOf } from '@/lib/type'
import { createComment } from '@/lib/api/items'

export function useCreateCommentMutation(options: useMutationOptionsOf<typeof createComment> = {}) {
  return useMutation(createComment, options)
}
