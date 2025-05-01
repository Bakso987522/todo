
<template>
  <form class="flex flex-col gap-2">
    <h2 class="text-2xl font-bold mb-4">Dodaj nową listę todo</h2>
    <input
      type="text"
      placeholder="Nazwa nowej listy"
      class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="text"
      placeholder="Opis nowej listy"
      class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="color"
      class="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
    >
      Dodaj
    </button>
  </form>
</template>
