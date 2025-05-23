<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const isOpen = ref(false)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}
const emit = defineEmits(['toggle-mobile-sidebar'])
</script>

<template>

  <nav class="m-2 mt-1 h-16 px-6 bg-gray-800 flex justify-between items-center text-lg font-semibold text-gray-300 shadow-md rounded-lg ">
    <button v-if="auth.isLogged" @click="emit('toggle-mobile-sidebar')" class="md:hidden text-white bg-gray-700 p-2 rounded">
      ☰
    </button>

    <!-- Logo / Nazwa -->
    <div class="text-xl md:text-3xl font-bold">
      {{ auth.isLogged ? "Witaj, " + auth.user.name : "ToDoApp" }}
    </div>

    <!-- Desktop Menu -->
    <div  v-if="!auth.isLogged">
      <div class="hidden md:flex gap-4">
        <RouterLink to="/login" class="hover:text-gray-500" active-class="text-gray-500">Logowanie</RouterLink>
        <RouterLink to="/register" class="hover:text-gray-500" active-class="text-gray-500">Rejestracja</RouterLink>
      </div>
      <div class="md:hidden">
        <RouterLink
            v-if="route.name === 'login'"
            to="/register"
            class="hover:text-gray-400"
        >
          Rejestracja
        </RouterLink>
        <RouterLink
            v-else-if="route.name === 'register'"
            to="/login"
            class="hover:text-gray-400"
        >
          Logowanie
        </RouterLink>
      </div>
    </div>

    <div class="flex gap-4 items-center" v-else>
      <div class="flex flex-col items-end text-sm">
        <p class="text-gray-300 text-xs md:text-base">
          {{
            new Intl.DateTimeFormat('pl-PL', { weekday: 'long' })
                .format(new Date())
                .replace(/^./, c => c.toUpperCase())
          }},
        </p>
        <p class="text-gray-400 text-xs md:text-md">{{ new Date().toLocaleDateString() }}</p>
      </div>
    </div>

  </nav>
</template>
