<template>

  <div v-auto-animate class="max-w-xl mx-auto mt-40 p-8 bg-blue-500 bg-opacity-10 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Logowanie</h2>
    <form @submit.prevent="loginProcess">
      <input v-model="email" required type="email" placeholder="Email" class="input" />
      <input v-model="password" required type="password" placeholder="Hasło" class="input" />
      <LoadingButton
          text="Zaloguj się"
          :loading="auth.loading"
          loadingText="Logowanie..."
      />

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore} from "@/stores/authStore.js";
import LoadingButton from "@/components/LoadingButton.vue";
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

async function loginProcess() {
  await auth.login(email.value, password.value)
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
