<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      TravelSphere Analytics
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Posts -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
        <p class="text-gray-500 dark:text-gray-400">Total Posts</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalPosts }}</p>
      </div>

      <!-- Total Comments -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
        <p class="text-gray-500 dark:text-gray-400">Total Comments</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalComments }}</p>
      </div>

      <!-- Most Bookmarked Post -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
        <p class="text-gray-500 dark:text-gray-400">Most Bookmarked</p>
        <p class="text-lg font-semibold text-gray-800 dark:text-white">{{ mostBookmarked?.title || '-' }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ mostBookmarkedCount }} bookmarks</p>
      </div>

      <!-- Most Popular Tag -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
        <p class="text-gray-500 dark:text-gray-400">Most Popular Tag</p>
        <p class="text-lg font-semibold text-gray-800 dark:text-white">{{ mostPopularTag?.tag || '-' }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ mostPopularTag?.count || 0 }} occurrences</p>
      </div>

      <!-- Average Reactions -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
        <p class="text-gray-500 dark:text-gray-400">Average Rating</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ averageRating.toFixed(1) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePosts } from '@/composables/usePosts'
import { useComments } from '@/composables/useComments'
import { useBookmarkStore } from '@/store/bookmark'

const { posts } = usePosts()
const { comments } = useComments()
const bookmarkStore = useBookmarkStore()

// Total Posts
const totalPosts = computed(() => posts.value.length)

// Total Comments
const totalComments = computed(() => comments.value.length)

// Most Bookmarked Post
const mostBookmarked = computed(() => {
  if (bookmarkStore.bookmarks.length === 0) return null
  return bookmarkStore.bookmarks.reduce((prev, curr) => 
    bookmarkStore.bookmarks.filter(p => p.id === curr.id).length >
    bookmarkStore.bookmarks.filter(p => p.id === prev.id).length
      ? curr
      : prev
  )
})
const mostBookmarkedCount = computed(() => mostBookmarked.value ? bookmarkStore.bookmarks.filter(p => p.id === mostBookmarked.value!.id).length : 0)

// Most Popular Tag
const mostPopularTag = computed(() => {
  const tagCounts: Record<string, number> = {}
  posts.value.forEach(p => p.tags.forEach(tag => tagCounts[tag] = (tagCounts[tag] || 0) + 1))
  const entries = Object.entries(tagCounts)
  if (entries.length === 0) return null
  const [tag, count] = entries.reduce((a, b) => a[1] > b[1] ? a : b)
  return { tag, count }
})

// Average Reactions
const averageRating = computed(() => {
  if (posts.value.length === 0) return 0
  return posts.value.reduce((sum, p) => sum + p.reactions, 0) / posts.value.length
})
</script>