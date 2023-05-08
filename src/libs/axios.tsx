import axios from 'axios'

const baseAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

baseAxios.interceptors.request.use(async (config) => {
    var session: any = localStorage.getItem('session')
    session = session ? JSON.parse(session) : null
    const token = session?.token?.access_token
    config.headers = {
        Authorization: 'Bearer ' + token,
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

baseAxios.interceptors.response.use((response) => {
    return response.data ? response.data : response
}, (error) => {
    const { response = {} } = error
    const { data } = response
    if (response?.status === 401) {
        return Promise.reject(data)
    }
    return Promise.reject(data)
})

export default baseAxios