<template>
  <div>
    <p class="my-name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyName',
  data() {
    return {
      name: 'Hello, My name is Fuli Lin!',
    }
  },
}
</script>

<style scoped>
.my-name {
  padding-top: 20px;
  font-size: 18px;
  color: red;
}
</style>
