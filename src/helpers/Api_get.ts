import { Entornos } from "@/helpers/Entornos";
import axios from "axios";

// Obtiene la URL base desde un helper de entornos
const { BASE_URL } = Entornos();

// Configura una instancia de Axios con la URL base y un timeout
const InstanciaAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
});

// Función para realizar una solicitud HTTP con Axios
export const Requestmake = async (endpoint: string, method: string, data: any = null) => {
    try {
        // Realiza la solicitud con el endpoint, método y datos proporcionados
        const response = await InstanciaAxios({
            url: endpoint,
            method: method,
            data: data
        });
        // Retorna la respuesta en caso de éxito
        return {
            data: response.data,
            dataError: null
        };
    } catch (error) {
        // Loguea y retorna el error en caso de fallo
        console.error("Error in Requestmake:", error);
        return {
            data: null,
            dataError: error
        };
    }
};



