<template>
  <div v-auto-animate class="max-w-md mx-auto mt-10 p-8 bg-blue-500 bg-opacity-10 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Rejestracja</h2>
    <form v-auto-animate @submit.prevent="register">
      <input v-model="name" required type="text" placeholder="Imię" class="input" />
      <input v-model="email" required type="email" placeholder="Email" class="input" />
      <input v-model="password" required type="password" minlength="8" placeholder="Hasło" class="input" />
      <input v-model="rePassword" required type="password" minlength="8" placeholder="Powtórz Hasło" class="input" />
      <p v-if="!matchPassword && rePassword" class="text-red-500 text-xm mb-2">Hasła nie są takie same</p>
      <LoadingButton
          text="Zarejestruj się"
          :loading="auth.loading"
          loadingText="Rejestracja..."
          @click="handleRegister"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/authStore.js";
import LoadingButton from "@/components/LoadingButton.vue";


const name = ref('')
const email = ref('')
const password = ref('')
const rePassword = ref('')
const router = useRouter()
const auth = useAuthStore()
const matchPassword = computed(() => {
  return password.value === rePassword.value
})
async function handleRegister() {
    await auth.register(name.value, email.value, password.value)
    if (!auth.error) {
      await router.push('/todos')
    }
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
