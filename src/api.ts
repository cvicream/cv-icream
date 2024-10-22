import axios from 'axios'
import type { CV, CreateCV, User } from './types'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers)
    config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

apiInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 && window.location.pathname !== '/sign-in') {
    localStorage.removeItem('token')
    window.location.href = '/sign-in'
  }
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

export const deleteUser = async(): Promise<User | null> => {
  try {
    const { data } = await apiInstance.delete('/api/auth/user')
    return data
  }
  catch (error) {
    return null
  }
}

export const getCVs = async(): Promise<CV[] | null> => {
  try {
    const { data } = await apiInstance.get('/api/cv')
    return data
  }
  catch (error) {
    return null
  }
}

export const getCV = async(id: string): Promise<CV | null> => {
  try {
    const { data } = await apiInstance.get(`/api/cv/${id}`)
    return data
  }
  catch (error) {
    return null
  }
}

export const createCV = async(cv: CreateCV): Promise<CV | null> => {
  try {
    const { data } = await apiInstance.post('/api/cv', cv)
    return data
  }
  catch (error) {
    return null
  }
}

export const updateCV = async(cv: CV): Promise<CV | null> => {
  try {
    const { data } = await apiInstance.put(`/api/cv/${cv.id}`, cv)
    return data
  }
  catch (error) {
    return null
  }
}

export const deleteCV = async(id: string): Promise<boolean> => {
  try {
    await apiInstance.delete(`/api/cv/${id}`)
    return true
  }
  catch (error) {
    return false
  }
}

export const createSurvey = async(survey: { userId: number; survey: string }): Promise<any | null> => {
  try {
    const { data } = await apiInstance.post('/api/survey', survey)
    return data
  }
  catch (error) {
    return null
  }
}
