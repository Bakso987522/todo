<template>
  <div class="max-w-md mx-auto mt-40 ">
    <h2 class="text-2xl font-bold mb-4">Logowanie</h2>
    <form @submit.prevent="loginProcess">
      <input v-model="email" required type="email" placeholder="Email" class="input" />
      <input v-model="password" required type="password" placeholder="Hasło" class="input" />
      <p v-if="auth.error" class="text-red-500 text-xm m-2">{{auth.error}}</p>
      <button type="submit" :disabled="auth.loading" class="btn disabled:opacity-40">
        {{ auth.loading ? 'Logowanie...' : 'Zaloguj' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore} from "@/stores/authStore.js";

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function loginProcess() {
    const user = await useAuthStore().login(email.value, password.value)
    await router.push('/todos')
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
