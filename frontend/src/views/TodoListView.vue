<template>
<TodoList v-if="uiStore.currentTodoView === 'todolist'"
      :todoList="todoStore.todoList"
      :todoItems="visibleItems"
      :loading="todoStore.loading"
      :adding="todoStore.adding"
      @add-item="handleAddItem"
      @toggle-done="handleToggleDone"
      @remove-task="handleRemoveTask"
      @edit-task="handleEditTask"
  />
  <NewTodoList v-else/>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoList from '@/components/TodoList.vue'
import NewTodoList from "@/components/NewTodoList.vue";
import {useUiStore} from "@/stores/uiStore.js";

const todoStore = useTodoStore()
const uiStore = useUiStore()

const visible = ref(new Set())

onMounted(async () => {
  await todoStore.fetchTodoList()
})


const todoItems = computed(() => todoStore.todoList?.todo_items || [])
const visibleItems = computed(() => todoItems.value.filter(item => !item.deleted))

async function handleAddItem({ name, deadline, tag }) {
  await todoStore.addTodoItem(name, deadline, tag)
}

async function handleToggleDone(index) {
  const task = todoItems.value[index]
  task.is_done = !task.is_done
  await todoStore.updateTodoItem(task.id, { is_done: task.is_done })
}

function handleEditTask(index) {
  const task = todoItems.value[index]
  console.log('Edytuj zadanie:', task)
}

async function handleRemoveTask(index) {
  const task = visibleItems.value[index] // z widocznej listy
  if (!task) return
  task.deleted = true
  let undone = false
  uiStore.showUndoNotification('Zadanie zostało usunięte', {
    onUndo: () => {task.deleted = false; undone = true; uiStore.showConfirmationNotification('Cofnięto usunięcie')}
  })
  setTimeout(async () => {
    if (!undone) {
      await todoStore.removeTodoItem(task.id)
    }
  }, 5100)
}

</script>
