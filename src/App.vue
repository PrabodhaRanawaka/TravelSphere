<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookmarkStore } from '@/store/bookmark'
import NavBar from '@/components/layout/NavBar.vue'

const bookmarkStore = useBookmarkStore()

onMounted(() => {
  bookmarkStore.loadFromLocalStorage()
})
</script>
