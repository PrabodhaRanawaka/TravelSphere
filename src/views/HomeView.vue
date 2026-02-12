<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">TravelSphere</h1>

    <div v-if="loading" class="text-center p-10">Loading posts...</div>
    <div v-if="error" class="text-center p-10 text-red-500">{{ error }}</div>

    <div v-if="!loading && !error" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { usePosts } from '@/composables/usePosts'

const { posts, loading, error, fetchPosts } = usePosts()

onMounted(() => {
  fetchPosts()
})
</script>
