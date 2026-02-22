<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useBookmarkStore } from '@/store/bookmark'

const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
    <div class="font-bold text-xl">TravelSphere</div>

    <div class="flex items-center gap-4">
      <router-link to="/bookmarks" class="relative">
        Bookmarks
        <span v-if="bookmarkStore.bookmarks.length"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {{ bookmarkStore.bookmarks.length }}
        </span>
      </router-link>

      <div v-if="authStore.user">
        <span class="mr-4">Hello, {{ authStore.user.firstName }}</span>
        <button @click="handleLogout" class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">Logout</button>
      </div>

      <router-link v-else to="/login" class="px-3 py-1 rounded bg-blue-600 text-white">Login</router-link>
    </div>
  </nav>
</template>