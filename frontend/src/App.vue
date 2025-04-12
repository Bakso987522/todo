<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
    <Navbar />
  <div class="flex min-h-screen">
    <Sidebar />
    <!-- Widok strony -->
    <RouterView />
  </div>
</template>
