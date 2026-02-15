import { ref } from 'vue'
import type { Post, PostResponse } from '@/types/post'

export function usePosts() {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch('https://dummyjson.com/posts')
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data: PostResponse = await res.json()
      posts.value = data.posts
    } catch (err: unknown) {
      if (err instanceof Error) error.value = err.message
      else error.value = 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const fetchPostById = async (id: number): Promise<Post> => {
    const res = await fetch(`https://dummyjson.com/posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    return await res.json() as Post
  }


  return { posts, loading, error, fetchPosts, fetchPostById }
}
