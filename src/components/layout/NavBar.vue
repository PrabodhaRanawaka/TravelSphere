<template>
  <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
    <div class="font-bold text-xl">TravelSphere</div>
    <div class="relative">
      <router-link to="/bookmarks">Bookmarks</router-link>
      <span
        v-if="bookmarkStore.bookmarks.length"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
      >
        {{ bookmarkStore.bookmarks.length }}
      </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useBookmarkStore } from '@/store/bookmark'

const bookmarkStore = useBookmarkStore()
</script>
