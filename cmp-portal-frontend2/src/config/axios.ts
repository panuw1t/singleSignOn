import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)
