import axiosClient from './axios.client'

const boardApi={
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.post('boards')
}

export default boardApi