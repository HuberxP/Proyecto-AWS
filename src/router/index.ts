import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../views/products/ProductsList.vue';
import RegistroProduct from '../views/products/RegistroProduct.vue';
import Inicio from '../views/contents/DashBoardView.vue';
import ClientList  from '../views/clients/ClientsList.vue';
import RegistroClient from '../views/clients/RegistroClient.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Inicio
    },
  
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UserList.vue')
    },



    {
      path: '/clients',
      name: 'clientes',
      component: ClientList
    },

    {
      path: '/clients/new',
      name: 'client-create',
      component: RegistroClient
    },
    {
      path: '/clients/edit/:id',
      name: 'client-edit',
      component: RegistroClient
    },

    
    
// Rutas para productos 
    {
      path: '/products',  
      name: 'productos',
      component: ProductsList,
    },


    {
      path: '/products/new',  // Ruta para crear un nuevo producto
      name: 'product-create',
      component: RegistroProduct,
    },

    {
      path: '/products/edit/:id',  // Ruta para editar un producto existente, con parámetro dinámico :id
      name: 'product-edit',
      component: RegistroProduct,
      props: true  // Habilita pasar props al componente desde la ruta
    }

  ]
})

export default router
