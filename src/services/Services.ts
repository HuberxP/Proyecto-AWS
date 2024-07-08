//Define una serie de funciones asíncronas para interactuar con diferentes endpoints de una API utilizando la función
//Requestmake desde @/helpers/Api_get

import { Requestmake } from '@/helpers/Api_get';

//Metodos para productos
export const CrearProducto = async (data: any) => {
    return await Requestmake('/productos', 'POST', data);
}

export const ListarProducto = async () => {
    return await Requestmake('/productos', 'GET');
}

export const ActualizarProducto = async (id: number, data: any) => {
    return await Requestmake(`/productos/${id}`, 'PATCH', data);
}

export const ObtenerProducto = async (id: number, data: any) => {
    return await Requestmake(`/productos/${id}`, 'GET', data);
}

export const EliminarProducto = async (id: number, data: any) => {
    return await Requestmake(`/productos/${id}`, 'DELETE', data);
}

//Metodos para clientes

export const ListarCliente = async () => {
    return await Requestmake('/clientes', 'GET');
}

export const CrearCliente = async (data: any) => {
    return await Requestmake('/clientes', 'POST', data);
}

export const ActualizarCliente = async (id: number, data: any) => {
    return await Requestmake(`/clientes/${id}`, 'PATCH', data);
}

export const ObtenerCliente = async (id: number, data: any) => {
    return await Requestmake(`/clientes/${id}`, 'GET', data);
}

export const EliminarCliente = async (id: number, data: any) => {
    return await Requestmake(`/clientes/${id}`, 'DELETE', data);
}

//Metodos para usuarios

export const ListarUsuario = async () => {
    return await Requestmake('/usuario', 'GET');
}
