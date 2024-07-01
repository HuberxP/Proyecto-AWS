<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const idProducto = ref(route.params.id)


const nombre = ref('')
const precio = ref('')
const estado = ref('')
const imagen_url = ref('')
const mensaje = ref('')

function EditarProducto() {
  axios.patch(`http://localhost:3002/productos/${idProducto.value}`, {
    nombre: nombre.value,
    precio: precio.value,
    estado: estado.value,
    imagen_url: imagen_url.value
  })
 .then(function (response) {
    console.log(response);
    mensaje.value = 'Producto editado con éxito!';
  })
 .catch(function (error) {
    console.log(error);
    mensaje.value = 'Error al editar el producto';
  });
}
</script>

<template>
    <div class="bg-gray-/ flex items-center justify-center pt-5 pb-5">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h3 v-if="mensaje" class="text-green-600 text-center">{{ mensaje }}</h3>
        <br><br>
        <div class="flex justify-center mb-6">            
          <span class="inline-block bg-gray-200 rounded-full p-3">
            <svg class="w-6 h-6 text-gray-1000 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
            </svg>
              
          </span>
        </div>
        
        <h2 class="text-2xl font-semibold text-center mb-4">Edita el Producto</h2>
        
        <form @submit.prevent="EditarProducto" class="bt-10 bottom-5">
          <div class="flex space-x-4 mb-4">
            <input type="text" v-model="nombre" id="Name" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Nombre">
            <input type="text" v-model="precio" id="Price" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Precio">
          </div>
  

         <div class="mb-4">
            <select v-model="estado" id="estado" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required>
            <option value="">Seleccione un estado</option>
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
             <!-- Agrega más opciones aquí -->
            </select>
         </div>
  
          <div class="mb-4">
            <input v-model="imagen_url" type="url" id="url_imagen" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Url de la imagen">
            <p class="text-gray-600 text-xs mt-1 text-center">Debe insertar una url de su bucket s3</p>
          </div>
  
         
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Guardar</button>
          <br>
          <br>
          <button type="button" class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"><RouterLink to="/" >Cancelar</RouterLink></button>
         
        </form>
      </div>
    </div>
  </template>
  
<style scoped>
  /* Estilos adicionales si son necesarios */
</style>
  
 
  



  
  