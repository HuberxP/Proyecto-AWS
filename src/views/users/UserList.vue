<script setup>
import { onMounted, ref } from 'vue';
import { ListarUsuario } from '@/services/Services';

// Variables reactivas
const contenido = ref([]); // Referencia reactiva para almacenar los usuarios obtenidos
const mensaje = ref(''); // Mensaje para mostrar éxito o error
const errors = ref(null); // Variable para almacenar errores

// Función que se ejecuta cuando el componente se monta
onMounted(async () => {
    // Llamada al servicio para listar usuarios
    const { data, dataError } = await ListarUsuario(contenido);

    // Manejo de errores y datos obtenidos
    if (dataError) {
        errors.value = dataError; // Asigna el error obtenido
        mensaje.value = 'Error al cargar los Usuarios'; // Mensaje de error
    } else {
        contenido.value = data; // Asigna los usuarios obtenidos
        mensaje.value = ''; // Limpia el mensaje de error
        errors.value = null; // Limpia los errores
    }
});
</script>


<template>
    <div class="relative flex flex-col bg-clip-border rounded-xl text-gray-700 shadow-md overflow-hidden xl:col-span-2" >   
        <h1 class="text-3xl text-center font-semibold border-b-2 mb-2 pb-2 ">Listado de usuarios</h1>
    </div>
    <div v-if="mensaje" :class="errors ? 'text-red-600' : 'text-green-600'" class="text-center">{{ mensaje }}</div>
    <div v-if="errors" class="text-red-600 text-center mb-4">
        <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
    </div>
    
    <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Apellido</th>
                        <th scope="col" class="px-6 py-3">Nombre de usuario</th>                   
                        <th scope="col" class="px-6 py-3">Correo</th>
                        <th scope="col" class="px-6 py-3">Número de Teléfono</th>
                        <th scope="col" class="px-6 py-3">ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(elemento, Users) in contenido" :key="Users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">{{elemento.nombre}}</td>
                        <td class="px-6 py-4">{{elemento.apellido}}</td>
                        <td class="px-6 py-4">{{elemento.nombre_usuario}}</td>                       
                        <td class="px-6 py-4">{{elemento.correo}}</td>
                        <td class="px-6 py-4">{{elemento.telefono}}</td>
                        <td class="px-6 py-4">{{elemento.id}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>    
</template>
