<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <div class="panel">
      <h2>Query Books</h2>
      <div class="query-controls">
        <label>Search by ISBN:</label>
        <input type="text" v-model="filterValue" placeholder="Enter ISBN Number here" />

        <label>Order By:</label>
        <select v-model="orderByField">
          <option value="isbn">ISBN</option>
          <option value="name">Name</option>
        </select>

        <select v-model="orderDirection">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label>Limit:</label>
        <input type="number" v-model.number="limit" min="1" />

        <button @click="queryBooks">Apply Query</button>
        <button @click="resetQuery">Reset Query</button>
      </div>
    </div>

    <div v-if="books.length > 0" class="book-list">
      <h2>Books</h2>
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-header">
          <span>ISBN: {{ book.isbn }}</span> -
          <span>{{ book.name }}</span>
          <button @click="startEdit(book)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="editingBook" class="panel">
      <h2>Edit Book</h2>
      <form @submit.prevent="updateBook">
        <input v-model="editingBook.isbn" required />
        <input v-model="editingBook.name" required />
        <button type="submit">Update</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  limit as limitFn,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const books = ref([])
    const editingBook = ref(null)

    // query parameters
    const filterField = ref('isbn')
    const filterValue = ref('')
    const orderByField = ref('name')
    const orderDirection = ref('asc')
    const limit = ref(5)

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
        })

        isbn.value = ''
        name.value = ''
        await queryBooks()
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    const startEdit = (book) => {
      editingBook.value = { ...book }
    }
    const cancelEdit = () => {
      editingBook.value = null
    }
    const updateBook = async () => {
      if (!editingBook.value) return
      const bookRef = doc(db, 'books', editingBook.value.id)
      await updateDoc(bookRef, {
        isbn: Number(editingBook.value.isbn),
        name: editingBook.value.name,
      })
      editingBook.value = null
      await queryBooks()
    }

    const deleteBook = async (id) => {
      if (!confirm('Are you sure you want to delete this book?')) return
      await deleteDoc(doc(db, 'books', id))
      await queryBooks()
    }

    const queryBooks = async () => {
      try {
        let q

        if (filterValue.value) {
          const isbnNumber = Number(filterValue.value)
          if (isNaN(isbnNumber)) {
            alert('Please enter a valid ISBN number')
            return
          }

          q = query(collection(db, 'books'), where('isbn', '==', isbnNumber), limitFn(limit.value))
        } else {
          q = query(
            collection(db, 'books'),
            orderBy(orderByField.value, orderDirection.value),
            limitFn(limit.value),
          )
        }

        const querySnapshot = await getDocs(q)
        books.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      } catch (error) {
        console.error('Error querying books: ', error)
      }
    }

    const resetQuery = () => {
      filterValue.value = ''
      orderByField.value = 'name'
      orderDirection.value = 'asc'
      limit.value = 5
      queryBooks()
    }

    return {
      isbn,
      name,
      books,
      editingBook,
      filterValue,
      orderByField,
      orderDirection,
      limit,
      addBook,
      startEdit,
      cancelEdit,
      updateBook,
      deleteBook,
      queryBooks,
      resetQuery,
    }
  },
}
</script>
