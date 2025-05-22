<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MobileSidebar from "@/components/MobileSidebar.vue";
import Notifications from "@/components/Notifications.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useUiStore } from "@/stores/uiStore.js";
import { useRoute } from "vue-router";

const uiStore = useUiStore()
const auth = useAuthStore()
const route = useRoute()

const showSidebar = computed(() =>
    auth.isLogged && ['todos', 'adminpanel'].includes(route.name)
)

const showMobileSidebar = ref(false)

onMounted(async () => {
  if (!uiStore.colors) await uiStore.getColors()
})
</script>

<template>
  <div :class="['grid h-screen grid-rows-[4rem_1fr] bg-gray-900', auth.isLogged ? 'grid-cols-1 md:grid-cols-[15rem_1fr]' : 'grid-cols-1']">
    <Navbar @toggle-mobile-sidebar="showMobileSidebar = true" class="col-span-1 md:col-span-2 row-start-1 bg-gray-800" />

    <!-- Sidebar desktop -->
    <Sidebar v-if="showSidebar" class="hidden md:flex row-start-2 col-start-1 bg-gray-800" />

    <!-- Sidebar mobile -->
    <MobileSidebar class="flex md:hidden" :visible="showMobileSidebar" @close="showMobileSidebar = false" />

    <main :class="['row-start-2 overflow-y-auto text-white p-6', auth.isLogged ? 'col-start-1 md:col-start-2' : 'col-start-1']">
      <RouterView />
    </main>
  </div>

  <Notifications />
</template>
