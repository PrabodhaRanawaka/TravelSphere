import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: () => import('@/views/PostDetailView.vue'),
    props: true
  },

  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/views/BookmarksView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

import { useAuthStore } from '@/store/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.restoreSession()

  if (to.meta.requiresAuth && !authStore.user) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
