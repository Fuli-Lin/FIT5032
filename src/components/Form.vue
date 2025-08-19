<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 mx-auto">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="username">Username:</label><br />
              <input
                type="text"
                id="username"
                name="username"
                v-model="formData.username"
                class="form-control"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label for="password">Password:</label><br />
              <input
                type="password"
                id="password"
                name="password"
                v-model="formData.password"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="isAustralian">Australian Resident?</label><br />
              <input
                type="checkbox"
                id="isAustralian"
                name="isAustralian"
                v-model="formData.isAustralian"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label for="gender">Gender</label><br />
              <select id="gender" v-model="formData.gender" class="form-select">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason">Reason For Joining:</label><br />
            <textarea
              id="reason"
              name="reason"
              rows="3"
              v-model="formData.reason"
              class="form-control"
            ></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
      <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-wrap justify-content-start">
          <div
            v-for="(card, index) in submittedCards"
            :key="index"
            class="card m-2"
            style="width: 18rem"
          >
            <div class="card-header">User Information</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Username: {{ card.username }}</li>
              <li class="list-group-item">Password: {{ card.password }}</li>
              <li class="list-group-item">
                Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
              </li>
              <li class="list-group-item">Gender: {{ card.gender }}</li>
              <li class="list-group-item">Reason: {{ card.reason }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value,
  })
}

function clearForm() {
  formData.value.username = ''
  formData.value.password = ''
  formData.value.isAustralian = false
  formData.value.gender = ''
  formData.value.reason = ''
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
