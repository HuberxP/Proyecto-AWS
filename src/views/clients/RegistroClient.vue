<script setup>
import { ref, onMounted } from 'vue';  // Importación de funciones reactivas y hook de montaje
import { useRouter, useRoute } from 'vue-router';  // Importación de funciones de enrutamiento de Vue Router
import { CrearCliente, ObtenerCliente, ActualizarCliente, EliminarCliente } from '@/services/Services';  // Importación de funciones de servicio para clientes
import Swal from 'sweetalert2';  // Importación de SweetAlert2 para mensajes modales

const route = useRoute();  // Acceso a la ruta actual
const router = useRouter();  // Acceso al objeto router para navegación

// Definición de variables reactivas
const cliente = ref({
  nombre: '',
  apellido: '',
  apellido2: '',
  direccion: '',
  correo: '',
  telefono: '',
});

const mensaje = ref('');  // Variable reactiva para mensajes de éxito o error
const esEdicion = route.name === 'client-edit';  // Booleano que indica si está en modo edición

// Función asincrónica para cargar datos del cliente en modo edición
const cargarCliente = async () => {
  try {
    const { data } = await ObtenerCliente(route.params.id);  // Llamada a la API para obtener datos del cliente por ID
    const clienteData = data[0];  // Obtención de datos del primer elemento devuelto (suponiendo que ObtenerCliente devuelve una lista)
    cliente.value = {
      nombre: clienteData.nombre,
      apellido: clienteData.apellido,
      apellido2: clienteData.apellido2,
      direccion: clienteData.direccion,
      correo: clienteData.correo,
      telefono: clienteData.telefono
    };
  } catch (error) {
    console.error('Error al cargar el cliente:', error);  // Manejo de errores si falla la carga del cliente
    mensaje.value = 'Error al cargar el cliente';
  }
};

// Función para guardar cliente (creación o actualización)
const guardarCliente = async () => {
  try {
    if (esEdicion) {
      await ActualizarCliente(route.params.id, cliente.value);  // Llamada a la API para actualizar cliente existente
      mensaje.value = 'Cliente actualizado correctamente';
    } else {
      await CrearCliente(cliente.value);  // Llamada a la API para crear nuevo cliente
      mensaje.value = 'Cliente creado correctamente';
    }
    router.push({ name: 'clientes' });  // Redirección a la lista de clientes después de guardar
  } catch (error) {
    console.error('Error al guardar el cliente:', error);  // Manejo de errores si falla guardar cliente
    mensaje.value = 'Error al guardar el cliente';
  }
};

// Función para eliminar cliente con confirmación mediante SweetAlert2
const eliminarCliente = async () => {
  const confirmacion = await Swal.fire({
    title: '¿Estás seguro?',  // Título del mensaje modal
    text: '¡No podrás revertir esto!',  // Texto descriptivo en el mensaje modal
    icon: 'warning',  // Ícono de advertencia en el mensaje modal
    showCancelButton: true,  // Mostrar botón de cancelar en el mensaje modal
    confirmButtonColor: '#3085d6',  // Color del botón de confirmación
    cancelButtonColor: '#d33',  // Color del botón de cancelar
    confirmButtonText: 'Sí, eliminarlo'  // Texto del botón de confirmación
  });

  if (confirmacion.isConfirmed) {  // Si el usuario confirma la eliminación
    try {
      await EliminarCliente(route.params.id);  // Llamada a la API para eliminar el cliente por ID
      await Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');  // Mensaje de éxito utilizando SweetAlert2
      router.push({ name: 'clientes' });  // Redirección a la lista de clientes después de eliminar
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);  // Manejo de errores si falla eliminar cliente
      mensaje.value = 'Error al eliminar el cliente';
    }
  }
};

// Cargar el cliente al montar el componente en modo edición
onMounted(() => {
  if (esEdicion) {
    cargarCliente();  // Llama a cargarCliente si está en modo edición al montar el componente
  }
});
</script>

<template>
  <div class="bg-gray-200 flex items-center justify-center pt-5 pb-5">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">

      <!-- Mensaje de éxito o error -->
      <h3 v-if="mensaje" :class="errors ? 'text-red-600' : 'text-green-600 text-center'">{{ mensaje }}</h3>
      <div v-if="errors" class="text-red-600 text-center mb-4">
        <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
      </div>
      
      <!-- Icono decorativo -->
      <div class="flex justify-center mb-6">
        <span class="inline-block bg-gray-200 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
          </svg>
        </span>
      </div>
      
      <!-- Título del formulario -->
      <h2 class="text-2xl font-semibold text-center mb-4">{{ esEdicion ? 'Actualizar' : 'Crear' }} Cliente</h2>
      
      <!-- Formulario para ingresar datos del cliente -->
      <form @submit.prevent="guardarCliente">
        <div class="flex space-x-4 mb-4">
          <input v-model="cliente.nombre" type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 text-center" required placeholder="Nombres">
        </div>
        <div class="flex space-x-4 mb-4">
          <input v-model="cliente.apellido" type="text" id="apellido" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Primer Apellido">
          <input v-model="cliente.apellido2" type="text" id="apellido2" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Segundo Apellido">
        </div>
        <div class="mb-4">
          <input v-model="cliente.telefono" type="text" id="telefono" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Telefono">
        </div>
        <div class="mb-4">
          <input v-model="cliente.correo" type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="E-mail">
        </div>
        <div class="mb-6">
          <input v-model="cliente.direccion" type="text" id="direccion" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Direccion">
          <p class="text-gray-600 text-xs mt-1 text-center">Ingrese telefono o Celular</p>
        </div>

        <!-- Botones para guardar, cancelar y eliminar cliente -->
        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{{ esEdicion ? 'Actualizar' : 'Crear' }}</button>
        <br><br>
        <button type="button" class="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"><RouterLink :to="{ name: 'clientes' }">Cancelar</RouterLink></button>
        <br><br>
        <!-- Botón de eliminar con SweetAlert2 -->
        <button v-if="esEdicion" type="button" class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" @click="eliminarCliente">Eliminar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos del componente, si es necesario */
</style>
