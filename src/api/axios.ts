import axios from "axios";

const baseURL =
    import.meta.env.VITE_API_BASE_URL || "https://pcninventory-production.up.railway.app/api";

const instance = axios.create({
    baseURL,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;
