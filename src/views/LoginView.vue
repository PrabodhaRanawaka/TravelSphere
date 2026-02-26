<template>
  <div class="p-6 max-w-md mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)

const handleLogin = async () => {
  error.value = null
  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })

    // 👇 Redirect back to original page if exists
    const redirectPath = (route.query.redirect as string) || '/'
    router.push(redirectPath)

  } catch (err: unknown) {
    if (err instanceof Error) error.value = err.message
  }
}
</script>