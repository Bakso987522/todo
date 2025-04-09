<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- Nawigacja -->
    <nav class="fixed top-0 left-0 right-0 p-6 bg-gray-800 flex justify-between items-center text-lg font-semibold text-gray-300 z-10 shadow-md">

      <!-- Logo -->
      <div class="text-2xl font-bold">ToDoApp</div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-4">
        <RouterLink to="/todos" class="hover:text-gray-500" active-class="text-blue-700">Zadania</RouterLink>
        <RouterLink to="/login" class="hover:text-gray-500" active-class="text-blue-700">Logowanie</RouterLink>
        <RouterLink to="/register" class="hover:text-gray-500" active-class="text-blue-700">Rejestracja</RouterLink>
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

    <!-- Widok strony -->
    <RouterView />
  </div>
</template>
