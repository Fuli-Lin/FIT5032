<template>
  <div id="app">
    <h1>Book Count</h1>
    <button @click="getBookCount">Get Book Counts</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { count } from 'firebase/firestore'

export default {
  data() {
    return {
      count: null,
      error: null,
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-op3d5ll2wq-uc.a.run.app')
        this.count = response.data.count
        this.error = null
      } catch (error) {
        console.error('Error fetching book count: ', error)
        this.error = error
        this.count = null
      }
    },
  },
}
</script>
