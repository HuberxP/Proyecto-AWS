<script setup>
import { onMounted, ref } from 'vue';
import { ListarCliente } from '@/services/Services';
import { RouterLink } from 'vue-router';

const contenido = ref([]);
const mensaje = ref('');
const errors = ref(null);

onMounted(async () => {
    const { data, dataError } = await ListarCliente(contenido);
    if (dataError) {
        errors.value = dataError;
        mensaje.value = 'Error al cargar los clientes';
    } else {
        contenido.value = data;
        mensaje.value = '';
        errors.value = null;
    }
});
</script>

<template>
<h2 class="text-2xl font-semibold text-center mb-4">Clientes</h2>

<div v-if="mensaje" :class="errors ? 'text-red-600' : 'text-green-600'" class="text-center">{{ mensaje }}</div>
  <div v-if="errors" class="text-red-600 text-center mb-4">
    <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
  </div>



  <div class="overflow-x-auto">
    <div class="bg-gray-/ flex items-center justify-center pt- pb-5">
      <div class="w-full lg:w-5/6">
        <div class="bg-white shadow-md rounded my-6">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr class="bg-gray-200 text-gray-1000 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">Nombres</th>
                <th class="py-3 px-6 text-left">Apellidos</th>
                <th class="py-3 px-6 text-center">Direccion</th>
                <th class="py-3 px-6 text-center">Correo</th>
                <th class="py-3 px-6 text-center">Telefono</th>
                <th class="py-3 px-6 text-center">Opciones</th>
              </tr>
            </thead>
            <tbody class="text-gray-900 text-sm font-light">
              <tr v-for="(elemento, clients) in contenido" :key="clients" class="border-b border-gray-200 hover:bg-red-200">
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-medium">{{ elemento.nombre }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="font-medium">{{ elemento.apellido }} {{ elemento.apellido2 }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-center whitespace-nowrap">
                  <span class="font-medium">{{ elemento.direccion }}</span>
                </td>
                <td class="py-3 px-6 text-center whitespace-nowrap">
                  <span class="font-medium">{{ elemento.correo }}</span>
                </td>
                <td class="py-3 px-6 text-center whitespace-nowrap">
                  <span class="font-medium">{{ elemento.telefono }}</span>
                </td>
                <td class="w-1 px-12   hover:text-purple-500 hover:scale-1500 text-center whitespace-nowrap">
                  <!-- Opciones (botones de editar/eliminar por ejemplo) -->                    
                        <RouterLink :to="{ name: 'client-edit', params: {id: elemento.id} }">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </RouterLink>                       
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar tus estilos aquí */
</style>
