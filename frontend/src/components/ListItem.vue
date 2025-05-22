<template>
  <li
      ref="liRef"
      :key="item.id"
      :class="[
      'flex group justify-between items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md relative transition-transform duration-100 ',
      item.deadline && !isEditing ? 'pt-4' : '',
      isOtherItemEditing ? 'opacity-50 pointer-events-none select-none' : '',
      isEditing ? 'hover:scale-[1.01]' : ''
    ]"
  >
    <!-- Checkbox -->
    <input
        :name="item.id"
        type="checkbox"
        class="mr-3 w-5 h-5 cursor-pointer transition-all duration-300"
        :checked="item.is_done"
        @change="emit('toggleDone', index)"
        :class="[color, item.deadline ? '-translate-y-1' : '']"
        :disabled="isEditing"
    />

<div :class="isEditing ? 'flex flex-col lg:flex-row gap-4 items-center w-full' : 'flex w-full'">
    <div class="flex-1">
      <div v-if="!isEditing" class="text-xs text-gray-400 absolute left-12 top-1">
        {{ item.deadline }}
      </div>
      <input
          v-else
          type="date"
          v-model="editedDeadline"
          class="text-xs bg-gray-700 text-white rounded px-1 py-0.5 my-1 focus:outline-none focus:ring focus:ring-white focus:ring-opacity-20"
      />

        <div
            v-if="!isEditing"
            class="text-white break-words break-all pr-4 select-text"
            :class="{
            'line-through text-gray-500 opacity-60': item.is_done,
            'mb-2': item.tag
          }"
        >
          {{ item.name }}
        </div>

        <input
            v-else
            required
            v-model="editedName"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            ref="inputRef"
            class="w-full bg-gray-700 text-white px-2 py-1 my-2 rounded focus:outline-none focus:ring focus:ring-white focus:ring-opacity-20"
        />


      <!-- Tag -->
      <span v-if="!isEditing" class="text-xs absolute left-12 bottom-1 italic">{{ item.tag?.name }}</span>
      <input
          v-else
          v-model="editedTag"
          type="text"
          placeholder="Tag"
          class="bg-gray-700 text-white px-1 py-0.5 my-1 rounded focus:outline-none focus:ring focus:ring-white focus:ring-opacity-20"
      />
    </div>

    <!-- Action buttons -->
    <div v-if="!isEditing" class="flex items-center gap-2 justify-center">
      <button
          @click="startEdit"
          class="hover:scale-110 hover:opacity-70 transition-all duration-200 md:opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
             class="w-6 h-6" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             style="vertical-align: middle;">
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
        </svg>
      </button>

      <button
          @click="emit('removeTask', index)"
          class="hover:scale-110 hover:opacity-70 transition-all duration-200 md:opacity-0 group-hover:opacity-100 mx-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-else class="flex flex-row lg:flex-col  gap-24 lg:gap-4 ml-1">
      <button @click="saveEdit" class="hover:scale-110 hover:opacity-70 transition-all duration-200">
        Zapisz
      </button>
      <button @click="cancelEdit" class="hover:scale-110 hover:opacity-70 transition-all duration-200 mx-2">
        Anuluj
      </button>
    </div>
</div>
  </li>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  item: Object,
  index: Number,
  color: String,
  editingIndex: Number
})

const emit = defineEmits([
  'toggleDone',
  'editTask',
  'removeTask',
  'editStart',
  'editEnd'
])

const isEditing = computed(() => props.editingIndex === props.index)
const isOtherItemEditing = computed(() => props.editingIndex !== null && props.editingIndex !== props.index)

const editedName = ref('')
const editedDeadline = ref('')
const editedTag = ref('')
const inputRef = ref(null)
const liRef = ref(null)

function startEdit() {
  editedName.value = props.item.name
  editedDeadline.value = props.item.deadline || null
  editedTag.value = props.item.tag?.name || null
  emit('editStart')
  nextTick(() => inputRef.value?.focus())
}

function saveEdit() {
  emit('editTask', {
    index: props.index,
    item: {
      ...props.item,
      name: editedName.value.trim(),
      deadline: editedDeadline.value,
      tag: { name: editedTag?.value?.trim() || '' }
    }
  })
  emit('editEnd')
}

function cancelEdit() {
  emit('editEnd')
}
</script>
