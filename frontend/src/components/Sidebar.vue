<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-6 shadow-md flex flex-col">
    <div class="mb-10">
      <h2 class="text-lg font-bold">Dashboard</h2>
      <p class="text-sm">Witaj 👋</p>
    </div>

    <nav class="space-y-4 flex-1">
      <router-link to="/todos" class="block hover:underline">📋 Zadania</router-link>
      <router-link to="/konto" class="block hover:underline">👤 Konto</router-link>
    </nav>

    <button class="mt-auto text-sm hover:underline text-white">🚪 Wyloguj</button>
  </aside>
</template>

