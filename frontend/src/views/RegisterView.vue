<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Rejestracja</h2>
    <form @submit.prevent="register">
      <input v-model="login" type="login" placeholder="Login" class="input" />
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Hasło" class="input" />
      <input v-model="rePassword" type="password" placeholder="Powtórz Hasło" class="input" />
      <button type="submit" class="btn">Zarejestruj </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const login = ref('')
const email = ref('')
const password = ref('')
const rePassword = ref('')
const router = useRouter()

function register() {
  // Mock logowania – backend później
  console.log('Rejestracja:', email.value)
  router.push('/todos')
}
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded mb-4;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded;
}
</style>
