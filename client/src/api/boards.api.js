import axiosClient from './axios.client'

const boardApi={
    create: () => axiosClient.post('boards'),
    getAll: () => axiosClient.get('boards')
}

export default boardApi