import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/contents/DashBoardView.vue')
    },
  
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UserList.vue')
    },
    {
      path: '/clients',
      name: 'clientes',
      component: () => import('../views/clients/ClientsList.vue')
    },

    {
      path: '/clients/newclient',
      name: 'client-create',
      component: () => import('../views/clients/RegistroClient.vue')
    },
    {
      path: '/clients/editclient/:id',
      name: 'client-edit',
      component: () => import('../views/clients/EditClients.vue')
    },

    
    

    {
      path: '/products',
      name: 'productos',
      component: () => import('../views/products/ProductsList.vue')
    },
    {
      path: '/products/newproduct',
      name: 'product-create',
      component: () => import('../views/products/RegistroProduct.vue')
    },

    {
      path: '/products/editproduct/:id',
      name: 'product-edit',
      component: () => import('../views/products/EditProducts.vue')
    },
    {
      path: '/products/delete/:id',
      name: 'product-delete',
      component: () => import('../views/products/ProductDelete.vue')
    }
  ]
})

export default router
