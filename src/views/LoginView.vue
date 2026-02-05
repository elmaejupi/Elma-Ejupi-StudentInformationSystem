<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')

const router = useRouter() 
const login = () => {
  console.log('login clicked')

  if (!username.value || !password.value) {
    error.value = 'All fields are required'
    return
  }

  console.log('navigating to students')
  router.push('/students')
}

</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>

      <div class="field">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="Enter username" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter password" />
      </div>
      <p v-if="error" class = 'error'> {{ error }}</p>

      <button @click="login" class="login-btn">Login</button>
    </div>
  </div>
</template>

<style scoped>

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d2d9e0;
  margin-top: -50px;
}

.login-card {
    width: 600px;
    height: 400px;
  /* width: 100%;
  max-width: 360px; */
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #444;
}

.field input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.field input:focus {
  outline: none;
  border-color: #3e96c2;
}

.login-btn {
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
  background: #3e96c2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.login-btn:hover {
  background: rgb(24, 108, 147);
}

</style>