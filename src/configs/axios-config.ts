import axios from "axios"

const axiosConfig = () => {
    const instance = axios.create({
        // baseURL: process.env.BACKEND_URL,
        // chờ backend
        headers: {
            "Content-Type": "application/json",
        },
    })

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
            return Promise.reject(error)
        }
    )

    return instance
}

export default axiosConfig
