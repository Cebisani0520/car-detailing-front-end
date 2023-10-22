import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: ()=> import('../views/HomePage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('../views/HomePage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: ()=> import('../views/Dashboard.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: ()=> import('../views/Services.vue'),
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: ()=> import('../views/Bookings.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: ()=> import('../views/User.vue'),
    },
    {
      path: '/address',
      name: 'address',
      component: ()=> import('../views/ViewResidentials.vue'),
    },
    {
      path: '/employees',
      name: 'employees',
      component: ()=> import('../views/Employees.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/LoginView.vue'),

    },

  ]
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    next('/login'); // Use the next function to route to the login page
  } else {
    next(); // Continue with the navigation as normal
  }
});

export default router
