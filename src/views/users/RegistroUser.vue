<template>
  <div class="bg-gray-/ flex items-center justify-center pt-5 pb-5">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <div class="flex justify-center mb-6">
        <span class="inline-block bg-gray-200 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
          </svg>
        </span>
      </div>
      
      <h2 class="text-2xl font-semibold text-center mb-4">Crear un nuevo usuario</h2>
      
      <form class="bt-10 bottom-5">
        <div class="flex space-x-4 mb-4">
          <input type="text" id="fullName" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Nombres">
          <input type="text" id="lastname" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Apellidos">
        </div>

        <div class="mb-4">
          <input type="text" id="username" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Nombre de usuario">
        </div>

        <div class="mb-4">
          <input type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="E-mail">
        </div>

        <div class="mb-6">
          <input type="password" id="password" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="********">
          <p class="text-gray-600 text-xs mt-1">Debe contener mínimo 8 caracteres, una mayúscula y 4 números</p>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Registrar</button>
        <br>
        <br>
        <button type="button" class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Cancelar</button>
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
