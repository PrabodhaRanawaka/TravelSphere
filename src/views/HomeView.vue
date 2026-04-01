<template>
  <!-- HERO SECTION -->
  <div 
    class="relative h-[350px] flex items-center justify-center bg-cover bg-center transition-all duration-1000"
    :style="{ backgroundImage: `url(${images[currentImage]})` }"
  >
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="relative z-10 w-full max-w-2xl px-4 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Explore Travel Experiences
      </h1>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search destinations..."
        class="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
      />
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="p-6 max-w-7xl mx-auto">

    <!-- TAG FILTER -->
    <div class="flex flex-wrap gap-2 mb-6">
      <!-- ALL BUTTON -->
      <button
        @click="selectedTag = null"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
          selectedTag === null
            ? 'bg-[#CC5500] text-white shadow-md'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        All
      </button>

      <!-- TAG BUTTONS -->
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="selectedTag = tag"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
          selectedTag === tag
            ? 'bg-[#CC5500] text-white shadow-md'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        #{{ tag }}
      </button>
    </div>

    <!-- CONTENT -->
    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error }}
    </div>

    <PostList v-else :posts="filteredPosts" />

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { usePosts } from '@/composables/usePosts'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import PostList from '@/components/posts/PostList.vue'

const { posts, loading, error, fetchPosts } = usePosts()

const searchQuery = ref('')
const selectedTag = ref<string | null>(null)

// 🖼️ Images
const images = [
  '/images/travel1.jpg',
  '/images/travel2.jpg',
  '/images/travel3.jpg',
  '/images/travel4.jpg'
]

const currentImage = ref(0)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  fetchPosts()

  interval = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length
  }, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
})

// 🔎 Filter
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

// 🏷 Tags
const allTags = computed(() => {
  const tags = posts.value.flatMap(post => post.tags)
  return Array.from(new Set(tags))
})
</script>