<script setup>
import axios from 'axios';
import { onMounted } from 'vue'
import { ref } from 'vue'

const contenido = ref(0)

onMounted(() =>{
    axios.get('http://3.94.116.245/usuario')
  .then(function (response) {
    contenido.value = response.data
    
    
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
  
})

</script>

<template>
    <div class="relative flex flex-col bg-clip-border rounded-xl text-gray-700 shadow-md overflow-hidden xl:col-span-2" >   
        <h1 class="text-3xl text-center font-semibold border-b-2 mb-2 pb-2 ">Listado de usuarios</h1>
    </div> 
    <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Apellido</th>
                        <th scope="col" class="px-6 py-3">Correo</th>
                        <th scope="col" class="px-6 py-3">Número de Teléfono</th>
                         <th scope="col" class="px-6 py-3">ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="elemento in contenido" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">{{elemento.nombre}}</td>
                        <td class="px-6 py-4">{{elemento.apellido}}</td>
                        <td class="px-6 py-4">{{elemento.correo}}</td>
                        <td class="px-6 py-4">{{elemento.telefono}}</td>
                        <td class="px-6 py-4">{{elemento.id}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>    
</template>
