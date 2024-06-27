import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashBoardView.vue')
    },
  
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UserList.vue')
    },

    {
      path: '/register',
      name: 'registrar',
      component: () => import('../views/users/RegistroUser.vue')
    }
  ]
})

export default router
