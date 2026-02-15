import { ref } from 'vue'
import type { Comment, CommentResponse } from '@/types/comment'

export function useComments() {
  const comments = ref<Comment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCommentsByPost = async (postId: number) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(
        `https://dummyjson.com/comments/post/${postId}`
      )

      if (!res.ok) throw new Error('Failed to fetch comments')

      const data: CommentResponse = await res.json()
      comments.value = data.comments
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message
      else error.value = 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return { comments, loading, error, fetchCommentsByPost }
}