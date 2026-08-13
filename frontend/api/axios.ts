import axios from "axios" 

const url: string = import.meta.env.VITE_APP_MODE === "DEV" ? "http://localhost:5173/" : "https://frontendhanddraw.vercel.app" 

const api = axios.create({
    baseURL: url,
    withCredentials: true
})

export default api