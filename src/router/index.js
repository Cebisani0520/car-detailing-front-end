import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/HomePage.vue'),
      // redirect: '/dashboard',
      // children: [
      //   {
      //     name: 'dashboard',
      //     path: '/dashboard',
      //     component: ()=> import('../views/Dashboard.vue'),
      //   }
      // ]

    },
    {
      path: 
    },

  ]
})

export default router
