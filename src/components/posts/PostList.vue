<template>
  <div>
    <div
      v-if="posts.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 py-10"
    >
      No posts found.
    </div>

    <div
      v-else
      class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/post'
import PostCard from './PostCard.vue'

interface Props {
  posts: Post[]
}

defineProps<Props>()
</script>
