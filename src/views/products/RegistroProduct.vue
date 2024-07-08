<template>
  <div class="CentrarFP">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-semibold text-center mb-4">{{ esEdicion ? 'Actualizar' : 'Crear' }} Producto</h2>

      <!-- Mensaje de éxito o error -->
      <h3 v-if="mensaje" :class="errors ? 'text-red-600' : 'text-green-600 text-center'">{{ mensaje }}</h3>
      <div v-if="errors" class="text-red-600 text-center mb-4">
        <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="guardarProducto" class="bt-10 bottom-5">
        <div class="flex space-x-4 mb-4">
          <input v-model="producto.nombre" type="text" id="Name" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Nombre">
          <input v-model="producto.precio" type="text" id="Price" class="form-input w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Precio">
        </div>

        <div class="mb-4">
          <select v-model="producto.estado" id="estado" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required>
            <option value="">Seleccione un estado</option>
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>

        <div class="mb-4">
          <input v-model="producto.imagen_url" type="url" id="url_imagen" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Url de la imagen">
          <p class="text-gray-600 text-xs mt-1 text-center">Debe insertar una URL de su bucket S3</p>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{{ esEdicion ? 'Actualizar' : 'Crear' }}</button>
        <br>
        <br>
        <button type="button" class="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"><RouterLink :to="{ name: 'productos' }">Cancelar</RouterLink></button>
        <br>
        <br>
        <!-- Botón de eliminar -->
        <button v-if="esEdicion" type="button" class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" @click="confirmarEliminacion"> Eliminar</button>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CrearProducto, ObtenerProducto, ActualizarProducto, EliminarProducto } from '@/services/Services'; // Añade EliminarProducto
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const producto = ref({
  nombre: '',
  precio: '',
  estado: '',
  imagen_url: '',
});

const mensaje = ref('');
const errors = ref(null);

const esEdicion = route.name === 'product-edit';

// Función para cargar datos del producto en modo edición
const cargarProducto = async () => {
  try {
    const { data } = await ObtenerProducto(route.params.id);
    console.log('Datos obtenidos del producto:', data); // Log para verificar los datos obtenidos

    // Acceder al primer objeto en el array data
    const productoData = data[0];

    producto.value = {
      nombre: productoData.nombre,
      precio: productoData.precio,
      estado: productoData.estado,
      imagen_url: productoData.imagen_url
    };

    console.log('Datos asignados al formulario:', producto.value); // Log para verificar la asignación
  } catch (error) {
    console.error('Error al cargar el producto:', error);
    mensaje.value = 'Error al cargar el producto';
    errors.value = error.response?.data || 'Error desconocido';
  }
};

// Cargar el producto al montar el componente en modo edición
onMounted(() => {
  if (esEdicion) {
    cargarProducto();
  }
});

// Función para guardar producto (creación o actualización)
const guardarProducto = async () => {
  try {
    if (esEdicion) {
      // Actualiza el producto con los datos actuales
      await ActualizarProducto(route.params.id, producto.value);
      mensaje.value = 'Producto actualizado correctamente';
    } else {
      // Crea un nuevo producto con los datos actuales
      await CrearProducto(producto.value);
      mensaje.value = 'Producto creado correctamente';
    }
    // Redirige a la lista de productos después de guardar
    router.push({ name: 'productos' });
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    mensaje.value = 'Error al guardar el producto';
    errors.value = error.response?.data || 'Error desconocido';
  }
};

// Función para mostrar confirmación de eliminación con SweetAlert2
const confirmarEliminacion = async () => {
  const confirmacion = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo'
  })
  if (confirmacion.isConfirmed) {
    try {
      await EliminarProducto(route.params.id);
      await Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
      router.push({ name: 'productos' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      mensaje.value = 'Error al eliminar el producto';
    }
  }
};


</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
