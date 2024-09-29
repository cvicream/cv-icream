import axios from 'axios'
import type { User } from './types'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

apiInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 && window.location.pathname !== '/sign-in')
    window.location.href = '/sign-in'
  return error
})

export const getAuthUser = async(): Promise<User | null> => {
  try {
    const { data } = await apiInstance.get('/api/auth/user')
    return data
  }
  catch (error) {
    return null
  }
}

export const updateUser = async(user: User): Promise<User | null> => {
  try {
    const { data } = await apiInstance.put('/api/auth/user', user)
    return data
  }
  catch (error) {
    return null
  }
}

export const getCVs = async(): Promise<User | null> => {
  try {
    const { data } = await apiInstance.get('/api/cv')
    return data
  }
  catch (error) {
    return null
  }
}
