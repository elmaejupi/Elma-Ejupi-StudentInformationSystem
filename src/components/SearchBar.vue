<script setup>
import { ref, watch, defineEmits } from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['update:search'])

watch(searchTerm, (val) => {
  emit('update:search', val)
})

</script>

<template>
  <div class="search">
    <input 
      type="text" 
      placeholder="Search"
      v-model="searchTerm"
    >
  </div>
</template>

<style scoped>
.search {
  width: 80%;
  margin: 20px auto;
  text-align: center;
}

.search input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  border: 2px solid #3399ff;
  border-radius: 25px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #e6f2ff;
}

.search input::placeholder {
  color: #6699cc;
}

.search input:focus {
  border-color: #66b3ff;
  box-shadow: 0 0 8px rgba(51, 153, 255, 0.3);
}
</style>
