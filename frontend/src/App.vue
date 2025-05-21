<script setup>
import {onMounted} from "vue";
import { useAuthStore } from '@/stores/authStore'
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Notifications from "@/components/Notifications.vue";
import {useUiStore} from "@/stores/uiStore.js";

const uiStore = useUiStore()
onMounted(async () => {
  if (!uiStore.colors) {
    await uiStore.getColors()
  }
})
const auth = useAuthStore()

</script>

<template>

  <div
      :class="[
      'grid select-none h-screen grid-rows-[4rem_1fr] bg-gray-900',
      auth.isLogged ? 'grid-cols-1 md:grid-cols-[18rem_1fr] xl:grid-cols-[21rem_1fr]' : 'grid-cols-1'
    ]"
  >

    <!-- Navbar -->
    <Navbar class="col-span-1 md:col-span-2 row-start-1 bg-gray-800" />

    <!-- Sidebar tylko po zalogowaniu -->
    <Sidebar
        v-if="auth.isLogged"
        class="hidden md:flex row-start-2 col-start-1 bg-gray-800"
    />

    <!-- Main content -->
    <main
        :class="[
        'row-start-2 overflow-y-auto text-white p-6',
        auth.isLogged ? 'col-start-1 md:col-start-2' : 'col-start-1'
      ]"
    >
      <RouterView />
    </main>

  </div>
  <Notifications />
</template>
