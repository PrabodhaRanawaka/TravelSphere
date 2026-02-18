<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      Explore Travel Experiences
    </h1>

    <!-- Search Input -->
    <div class="mb-6 flex flex-col md:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search destinations..."
        class="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tag Filter -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        @click="selectedTag = null"
        :class="[
          'px-3 py-1 rounded-full text-sm transition',
          selectedTag === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        ]"
      >
        All
      </button>

      <button
        v-for="tag in allTags"
        :key="tag"
        @click="selectedTag = tag"
        :class="[
          'px-3 py-1 rounded-full text-sm transition',
          selectedTag === tag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        ]"
      >
        #{{ tag }}
      </button>
    </div>

    <!-- Loading / Error / Posts -->
    <LoadingSpinner v-if="loading" />
    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error }}
    </div>
    <PostList v-else :posts="filteredPosts" />
  </div>
</template>


<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { usePosts } from '@/composables/usePosts'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import PostList from '@/components/posts/PostList.vue'

const { posts, loading, error, fetchPosts } = usePosts()
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {

    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    const matchesTag = selectedTag.value
      ? post.tags.includes(selectedTag.value)
      : true

    return matchesSearch && matchesTag
  })
})

const allTags = computed(() => {
  const tags = posts.value.flatMap(post => post.tags)
  return Array.from(new Set(tags))
})


onMounted(() => {
  fetchPosts()
})
</script>