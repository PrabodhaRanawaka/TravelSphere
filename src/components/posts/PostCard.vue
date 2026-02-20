<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
    @click="goToDetail"
  >
    <h2 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
      {{ post.title }}
    </h2>

    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ truncatedBody }}
    </p>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full"
      >
        #{{ tag }}
      </span>
    </div>

    <button
      @click.stop="toggleBookmark"
      class="px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-700 hover:bg-blue-500 hover:text-white transition"
    >
      {{ isBookmarked ? 'Remove Bookmark' : 'Add Bookmark' }}
    </button>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types/post'
import { useBookmarkStore } from '@/store/bookmark'

interface Props {
  post: Post
}

const props = defineProps<Props>()
const router = useRouter()

const truncatedBody = computed(() =>
  props.post.body.length > 120
    ? props.post.body.substring(0, 120) + '...'
    : props.post.body
)

const goToDetail = () => {
  router.push(`/post/${props.post.id}`)
}

const bookmarkStore = useBookmarkStore()

const toggleBookmark = () => {
  if (isBookmarked.value) {
    bookmarkStore.removeBookmark(props.post.id)
  } else {
    bookmarkStore.addBookmark(props.post)
  }
}

const isBookmarked = computed(() =>
  bookmarkStore.bookmarks.some(p => p.id === props.post.id)
)

</script>