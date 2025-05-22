<template>
  <transition
    name="fade"
    enter-active-class="transition-opacity animate-in slide-in-from-left duration-300"
    leave-active-class="transition-opacity animate-out slide-out-to-left duration-300"


  >
    <div
        v-if="visible"
        class="fixed inset-0 z-50 bg-black bg-opacity-50"
        @click.self="close"
    >
      <div class="bg-gray-800 text-white w-80 h-full shadow-lg absolute left-0 top-0 flex flex-col">
        <!-- Zamknij -->
        <button
            @click="close"
            class="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
        >
          ✖
        </button>

        <!-- Sidebar -->
        <Sidebar class="flex-1 overflow-y-auto ml-1 pt-20 -m-2 px-4" @close="close" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close'])


function close() {
  emit('close')
}
</script>
