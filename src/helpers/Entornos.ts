export const Entornos = () => {
    console.log("BASE_URL:", import.meta.env.VITE_API_URL);
    return {
        BASE_URL: import.meta.env.VITE_API_URL
    }
}
