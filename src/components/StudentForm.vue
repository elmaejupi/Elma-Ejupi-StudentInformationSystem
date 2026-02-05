<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
  student: {
    type: Object,
    default: () => ({ name: '', dob: '', municipality: '' })
  }
})

const emit = defineEmits(['save', 'close'])

const form = ref({ ...props.student })

watch(() => props.student, (newVal) => {
  form.value = { ...newVal }
})

const submit = () => {
  if (!form.value.name || !form.value.dob || !form.value.municipality) {
    alert('All fields are required')
    return
  }
  emit('save', { ...form.value })
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="form-overlay">
    <div class="form-container">
      <h2>{{ form.id ? 'Edit Student' : 'Add New Student' }}</h2>
      <label>Name</label>
      <input type="text" v-model="form.name" placeholder="Name" />

      <label>Date of Birth</label>
      <input type="date" v-model="form.dob" />

      <label>Municipality</label>
      <input type="text" v-model="form.municipality" placeholder="Municipality" />

      <div class="buttons">
        <button @click="submit">{{ form.id ? 'Update' : 'Save' }}</button>
        <button @click="close" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  background-color: #e6f2ff;
  padding: 25px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
label {
  display: block;
  margin-top: 10px;
  margin-bottom: 4px;
}
input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #3399ff;
  outline: none;
}
input:focus {
  border-color: #66b3ff;
}
.buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3399ff;
  color: white;
  transition: 0.3s;
}
button.cancel {
  background-color: #1761a1;
}
button:hover {
  opacity: 0.8;
}
</style>
