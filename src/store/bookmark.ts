import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Post } from '@/types/post'

export const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref<Post[]>([])

  const addBookmark = (post: Post) => {
    if (!bookmarks.value.find(p => p.id === post.id)) {
      bookmarks.value.push(post)
      saveToLocalStorage()
    }
  }

  const removeBookmark = (postId: number) => {
    bookmarks.value = bookmarks.value.filter(p => p.id !== postId)
    saveToLocalStorage()
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('bookmarks')
    if (stored) {
      bookmarks.value = JSON.parse(stored)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  }

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    loadFromLocalStorage
  }
})
