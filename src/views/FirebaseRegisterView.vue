<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option disabled value="">Select role</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const register = async () => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful')
    await setDoc(doc(db, 'User', newUser.user.uid), { email: email.value, role: role.value })
    router.push('/FireLogin')
  } catch (error) {
    console.log(error.code, error.message)
  }
}
</script>

<style></style>
