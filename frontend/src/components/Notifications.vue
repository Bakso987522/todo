<template>
  <NotificationGroup group="confirmation">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications}"
            enter="ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0 translate-x-12"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              class="w-full max-w-sm mt-4 overflow-hidden bg-gray-600 rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
              v-for="notification in notifications"
              :key="notification.id"
          >
            <div class="p-4"
                 :class="uiStore.activeColor"
            >
              <div class="flex items-start">
                <div class="shrink-0">
                  <svg class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="font-semibold text-white">{{ notification.title }}</p>
                  <p class="text-sm font-semibold text-gray-200">{{ notification.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
  <NotificationGroup group="undo">
    <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none">
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications, close}"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0 translate-x-12"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              v-for="notification in notifications"
              :key="notification.id"
              class="relative w-full max-w-sm mt-4 overflow-hidden bg-gray-800 rounded-lg shadow-lg pointer-events-auto ring-1 ring-white ring-opacity-30 select-none"
              role="alert"
          >
              <div class="p-4 bg-opacity-10"
                   :class="uiStore.activeColor"
              >
                <div class="flex items-start">
                  <div class="shrink-0">
                    <svg class="w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01M10.29 3.86l-7.1 12.27A1 1 0 004 18h16a1 1 0 00.87-1.5L13.71 3.86a1 1 0 00-1.74 0z" />                    </svg>
                  </div>
                  <div class="ml-3 w-0 flex-1 pt-0.5 font-semibold">
                    <p class="text-white">{{ notification.title }}</p>
                    <p class="text-gray-200">{{ notification.text }}</p>
                  </div>
                  <div class="ml-4 flex-shrink-0 flex my-auto">
                    <button class="font-semibold text-white hover:text-gray-300 transition-all duration-200" @click="notification.data.onUndo();close(notification.id)">COFNIJ</button>
                  </div>
                </div>

              </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>
<script setup>
import {useUiStore} from "@/stores/uiStore.js";
import {useTodoStore} from "@/stores/todoStore.js";
const todoStore = useTodoStore()
const uiStore = useUiStore()

</script>