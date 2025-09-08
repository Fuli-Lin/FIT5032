<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const signin = async () => {
  try {
    const currentuser = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Sign in Successful')

    const userDoc = await getDoc(doc(db, 'User', currentuser.user.uid))
    if (userDoc.exists()) {
      console.log(auth.currentUser)
      console.log('User role:', userDoc.data().role)
    }

    router.push('/')
  } catch (error) {
    console.error(error.code, error.message)
  }
}
</script>

<style></style>
