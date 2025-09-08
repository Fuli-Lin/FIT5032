<template>
  <div>
    <h1>Log out</h1>
    <p v-if="user">Current user: {{ user.email }}</p>
    <button @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    currentUser.value = firebaseUser
    console.log('Current user:', firebaseUser)
  })
})

const logout = async () => {
  await signOut(auth)
  console.log('Logged out')
  router.push('/FireLogin')
}
</script>
