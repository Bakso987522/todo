<script setup>
import { ref } from 'vue';
import {useAuthStore} from "@/stores/authStore.js";
import router from "@/router/index.js";
const auth = useAuthStore()
const isOpen = ref(false);
const handleLogout = async () => {
  await useAuthStore().logout()
  await router.push('/login')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 p-6 bg-gray-800 flex justify-between items-center text-lg font-semibold text-gray-300 z-10 shadow-md">

    <!-- Logo -->
    <div class="text-2xl font-bold">{{auth.isLogged ? "Witaj, " + auth.user.name : "ToDoApp"}}</div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex gap-4" v-if="!auth.isLogged">
      <RouterLink to="/login" class="hover:text-gray-500" active-class="text-blue-700">Logowanie</RouterLink>
      <RouterLink to="/register" class="hover:text-gray-500" active-class="text-blue-700">Rejestracja</RouterLink>
    </div>

    <div class="hidden md:flex gap-4" v-else>
      <button @click="handleLogout" class="hover:text-gray-500">Wyloguj</button>

      <div class="flex flex-col items-end ">
        <p class="text-gray-300">{{ new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(new Date()).charAt(0).toUpperCase() + new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(new Date()).slice(1) + ", " }}</p>
        <p class="text-gray-400">{{ new Date().toLocaleDateString() }}</p>
      </div>



    </div>

    <!-- Hamburger Button -->
    <button @click="isOpen = !isOpen" class="md:hidden text-gray-500 bg-gray-900">
      <p v-if="!isOpen"> ☰</p>
      <p v-else>✖</p>

    </button>
  </nav>

  <!-- Mobile Menu -->
  <div v-if="isOpen" class="absolute top-14 left-0 w-full bg-gray-900 shadow-md flex flex-col gap-4 pt-16cd fr p-4 md:hidden">
    <RouterLink to="/todos" class="hover:text-gray-500" @click="isOpen = false">Zadania</RouterLink>
    <RouterLink to="/login" class="hover:text-gray-500" @click="isOpen = false">Logowanie</RouterLink>
    <RouterLink to="/register" class="hover:text-gray-500" @click="isOpen = false">Rejestracja</RouterLink>
  </div>

</template>
