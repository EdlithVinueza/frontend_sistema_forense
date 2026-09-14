import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue')
  },
  {
    path: '/certification',
    name: 'certification',
    component: () => import('../views/certification/CertificationFlow.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('estaAutenticado') === 'true';

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (!requiresAuth && isAuthenticated && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
    next('/certification');
  } else {
    next();
  }
});

export default router