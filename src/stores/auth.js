import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const hardcodedUser = {
    username: 'admin',
    password: '1234',
  }

  function login(username, password) {
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
