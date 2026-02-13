<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      Explore Travel Experiences
    </h1>

    <LoadingSpinner v-if="loading" />

    <div
      v-else-if="error"
      class="text-center text-red-500 py-10"
    >
      {{ error }}
    </div>

    <PostList
      v-else
      :posts="posts"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePosts } from '@/composables/usePosts'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import PostList from '@/components/posts/PostList.vue'

const { posts, loading, error, fetchPosts } = usePosts()

onMounted(() => {
  fetchPosts()
})
</script>