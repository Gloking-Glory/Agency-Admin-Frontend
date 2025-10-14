import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL || "http://localhost:8000/api",
    // withCredentials: true, ----- allows frontend to send cookies to the backend with all requests
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    timeout: 10000
});

apiClient.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : "";
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// for loggin and auto log out if server failed

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // const refresh = localStorage.getItem('refresh');
            // if (refresh) {
            //     const newToken = await refreshAccessToken(refresh);
            //     // Retry the failed request with the new token
            //     error.config.headers.Authorization = `Bearer ${newToken}`;
            //     return apiClient.request(error.config);
            // }
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href ='/login';
        }
        return Promise.reject(error);
    }
)

export default apiClient;
