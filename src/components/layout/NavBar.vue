<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useBookmarkStore } from '@/store/bookmark'
import { useThemeStore } from '@/store/theme'

const authStore = useAuthStore()
const bookmarkStore = useBookmarkStore()
const themeStore = useThemeStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <nav class="flex items-center justify-between p-8 bg-[#012626] text-white">
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
        <button @click="handleLogout" class="px-4 py-1 rounded-full bg-[#CC5500] hover:opacity-90 text-white transition">Logout</button>
      </div>

      <router-link v-else to="/login" class="px-4 py-1 rounded-full bg-[#CC5500] hover:opacity-90 text-white transition">Login</router-link>
      <router-link v-if="authStore.user" to="/dashboard" class="px-4 py-1 rounded-full bg-[#CC5500] hover:opacity-90 text-white transition">Dashboard</router-link>
      
      <button
        @click="themeStore.toggleTheme()"
        class="px-4 py-1 rounded-full bg-[#C76E00] hover:opacity-90 text-white transition"
      >
        {{ themeStore.darkMode ? 'Light' : 'Dark' }}
      </button>
    </div>
  </nav>
</template>