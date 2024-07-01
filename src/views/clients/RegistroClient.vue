<script setup>
import axios from 'axios';
import { ref } from 'vue'

const nombre = ref('')
const apellido = ref('')
const apellido2 = ref('')
const direccion = ref('')
const correo = ref('')
const telefono = ref('')
const mensaje = ref('')

function crearCliente() {
  axios.post('http://localhost:3002/clientes', {
    nombre: nombre.value,
    apellido: apellido.value,
    apellido2: apellido2.value,
    direccion: direccion.value,
    correo: correo.value,
    telefono: telefono.value
  })
  .then(function (response) {
    console.log(response);
    mensaje.value = 'Cliente creado con éxito!';
    nombre.value = '';
    apellido.value = '';
    apellido2.value = '';
    direccion.value = '';
    correo.value = '';
    telefono.value = '';
  })
  .catch(function (error) {
    console.log(error);
    mensaje.value = 'Error al crear el Cliente';
  });
}

</script>

<template>
  <div class="bg-gray-/ flex items-center justify-center pt-5 pb-5">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h3 v-if="mensaje" class="text-green-600 text-center">{{ mensaje }}</h3>
      <br>
      <br>
      <div class="flex justify-center mb-6">
        <span class="inline-block bg-gray-200 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
          </svg>
        </span>
      </div>
      
      <h2 class="text-2xl font-semibold text-center mb-4">Crear un cliente</h2>
      
      <form @submit.prevent="crearCliente" class="bt-10 bottom-5">
        <div class="flex space-x-4 mb-4">
          <input v-model="nombre" type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 text-center" required placeholder="Nombres">
          
        </div>
        <div class="flex space-x-4 mb-4">
          <input v-model="apellido" type="text" id="apellido" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Primer Apellido">
          <input v-model="apellido2" type="text" id="apellido2" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Segundo Apellido">
        </div>


        <div class="mb-4">
          <input v-model="telefono" type="number" id="telefono" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Telefono">
        </div>

        <div class="mb-4">
          <input v-model="correo" type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="E-mail">
        </div>

        <div class="mb-6">
          <input v-model="direccion" type="text" id="direccion" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Direccion">
          <p class="text-gray-600 text-xs mt-1 text-center">Ingrese telefono o Celular</p>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Crear</button>
        <br>
        <br>
        <button type="button" class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"><RouterLink to="/clients" >Cancelar</RouterLink></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserForm'
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
