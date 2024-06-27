<script setup lang="ts">
import {RouterView } from 'vue-router'
import NavComponent from './components/NavComponent.vue'
import AsideComponent from './components/AsideComponent.vue'
import FooterComponent from './components/FooterComponent.vue'






</script>

<template>

  <!--Nav-->
    <NavComponent/>

<div class="min-h-screen bg-gray-50/50">
  <!--Aside-->
  <AsideComponent/>
  <div class="p-4 xl:ml-80">
    
    <!--Body-->
   
    <RouterView/>
    <div class="text-blue-gray-600">
     
     
    </div>
  </div>
</div>

 



<!--Footer-->
<FooterComponent/>
</template>


