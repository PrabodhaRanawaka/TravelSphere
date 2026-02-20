<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      My Bookmarks
    </h1>

    <PostList :posts="bookmarkStore.bookmarks" />
  </div>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '@/store/bookmark'
import PostList from '@/components/posts/PostList.vue'

const bookmarkStore = useBookmarkStore()
</script>