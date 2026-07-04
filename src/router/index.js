import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/DashboardView.vue'),
    meta: { requiresAuth: true }
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
    redirect: '/certification'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Desactivado temporalmente para pruebas (acceso directo a certificación)
  /*
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('estaAutenticado') === 'true';

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (!requiresAuth && isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next('/dashboard');
  } else {
    next();
  }
  */
  next();
});

export default router