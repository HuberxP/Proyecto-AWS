<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'

const contenido = ref([])
 
onMounted(() => {
  axios
    .get('http://localhost:3002/productos')
    .then(function (response) {
      contenido.value = response.data
    })


    .catch(function (error) {
      // manejar errors
      console.log(error)
    })
})
</script>




<template>
  <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
  <h2 class="text-2xl font-semibold text-center mb-4">Productos</h2>

  <!-- ====== Cards Section Start -->
  <section class="pt-5 lg:pt-[20px] pb-5 lg:pb-10 bg-[#F3F4F6]">
     <div class="container-G">
        <div class="flex flex-wrap ">
           
           <div v-for="elemento in contenido" class="w-2 md:w-1/5 xl:w-1/5 px-2">
              <div class="Contenedor-G  bg-white rounded-lg ">
                <div class="img-container">
                  <img :src="elemento.imagen_url" alt="Imagen" class="w-full"/>
                </div>
                                     
                 <div class="p-2 sm:p-2 md:p-2 xl:p-2 text-center">
                    <h6>
                      <a href="javascript:void(0)" class=" font-semibold hover:text-primary">{{elemento.nombre}}</a>    
                    </h6>
                    <p class="text-base-1 leading-relaxed mb-1/2">$ {{elemento.precio.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) }}</p>
                    <p class="text-base-1  leading-relaxed mb-1/2">{{elemento.estado}}</p>
                    <a  class="inline-block bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs transform hover:text-green-500 hover:scale-110"><RouterLink :to="{ name: 'product-edit', params: {id: elemento.id} }">Editar</RouterLink></a>
                    
                    <a  class="inline-block bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs transform hover:text-green-500 hover:scale-110"><RouterLink :to="{ name: 'product-delete', params: { id: elemento.id } }">Eliminar</RouterLink></a>
                 </div>
              </div>
           </div>


        </div>
     </div>
  </section> 

  </template>

<style>
.img-container {
  height: 150px; /* ajusta el alto según tus necesidades */
  width: 100%; /* ancho del 100% del contenedor */
  overflow: hidden; /* oculta cualquier parte de la imagen que sobrepase el contenedor */
  border-bottom-color: black;
  border: 10px;
  
}

.img-container img {
  height: 100%; /* alto del 100% del contenedor */
  width: 100%; /* ancho del 100% del contenedor */
  object-fit: cover; /* ajusta la imagen para que se ajuste al contenedor */
  border-bottom-color: black;
  border: 10px;
}

.img-container img {
  max-width: 200px; /* ajusta el ancho máximo según tus necesidades */
  max-height: 150px; /* ajusta el alto máximo según tus necesidades */
  object-fit: cover;
  border-bottom-color: black;
  border: 10px;
  border-radius: 50px;
}

.text-base-1{
    font-size: 1 rem;
    color: black;
  
}

.Contenedor-G{
 border-radius: 50px;
 max-width: 200px;
 padding-right: 0;
 
}

.w-2{
 
  padding-bottom: 20px;
  
 }

</style>
