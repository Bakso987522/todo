<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import router from '@/router/index.js'

const auth = useAuthStore()
const isOpen = ref(false)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}
</script>

<template>

  <nav class="m-2 mt-1 h-16 px-6 bg-gray-800 flex justify-between items-center text-lg font-semibold text-gray-300 shadow-md rounded-lg ">

    <!-- Logo / Nazwa -->
    <div class="text-3xl font-bold">
      {{ auth.isLogged ? "Witaj, " + auth.user.name : "ToDoApp" }}
    </div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex gap-4" v-if="!auth.isLogged">
      <RouterLink to="/login" class="hover:text-gray-500" active-class="text-blue-700">Logowanie</RouterLink>
      <RouterLink to="/register" class="hover:text-gray-500" active-class="text-blue-700">Rejestracja</RouterLink>
    </div>

    <div class="hidden md:flex gap-4 items-center" v-else>
      <div class="flex flex-col items-end text-sm">
        <p class="text-gray-300 text-base">
          {{
            new Intl.DateTimeFormat('pl-PL', { weekday: 'long' })
                .format(new Date())
                .replace(/^./, c => c.toUpperCase())
          }},
        </p>
        <p class="text-gray-400">{{ new Date().toLocaleDateString() }}</p>
      </div>
    </div>

    <!-- Hamburger (Mobile) -->
    <button @click="isOpen = !isOpen" class="md:hidden text-gray-500 text-xl bg-gray-900 px-2 py-1 rounded">
      <span v-if="!isOpen">☰</span>
      <span v-else>✖</span>
    </button>


  <!-- Mobile Menu -->
  <div
      v-if="isOpen"
      class="md:hidden bg-gray-900 shadow-md flex flex-col gap-4 px-6 py-4"
  >
    <RouterLink to="/todos" class="hover:text-gray-400" @click="isOpen = false">📋 Zadania</RouterLink>
    <RouterLink to="/login" class="hover:text-gray-400" @click="isOpen = false">Logowanie</RouterLink>
    <RouterLink to="/register" class="hover:text-gray-400" @click="isOpen = false">Rejestracja</RouterLink>
  </div>
  </nav>
</template>
