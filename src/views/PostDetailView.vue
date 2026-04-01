<template>
  <div class="p-6 max-w-4xl mx-auto">

    <!-- Loading for post -->
    <LoadingSpinner v-if="loadingPost" />

    <!-- Post Content -->
    <div v-else-if="post">
      <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {{ post.title }}
      </h1>

      <p class="text-gray-700 dark:text-gray-300 mb-6">
        {{ post.body }}
      </p>

      <!-- PREMIUM STYLED TAGS -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-xs font-medium px-3 py-1 rounded-full 
                 bg-[#CC5500]/15 text-[#CC5500] 
                 hover:bg-[#CC5500]/25 
                 transition"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Comments Section -->
      <h2 class="text-xl font-semibold mb-4">
        Comments ({{ comments.length }})
      </h2>

      <LoadingSpinner v-if="loadingComments" />

      <div v-else class="space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
        >
          <p class="text-gray-700 dark:text-gray-300">
            {{ comment.body }}
          </p>
          <p class="text-sm text-gray-500 mt-2">
            — {{ comment.user.username }}
          </p>
        </div>
      </div>

    </div>

    <!-- Error Handling -->
    <div v-else-if="errorPost" class="text-red-500">
      {{ errorPost }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Post } from '@/types/post'
import { usePosts } from '@/composables/usePosts'
import { useComments } from '@/composables/useComments'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()
const postId = Number(route.params.id)

const post = ref<Post | null>(null)
const loadingPost = ref(false)
const errorPost = ref<string | null>(null)

const { fetchPostById } = usePosts()
const { comments, loading: loadingComments, fetchCommentsByPost } = useComments()

onMounted(async () => {
  loadingPost.value = true
  try {
    post.value = await fetchPostById(postId)
    await fetchCommentsByPost(postId)
  } catch (err: unknown) {
    if (err instanceof Error) errorPost.value = err.message
  } finally {
    loadingPost.value = false
  }
})
</script>