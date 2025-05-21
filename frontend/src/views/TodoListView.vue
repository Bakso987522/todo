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
      @edit-list="handleEditList"
      @delete-list="handleRemoveList"
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

function handleEditTask({ index, item }) {
  console.log('edycja:', item)
  const task = todoItems.value[index]
  if (!task) return

  const changed =
      task.name !== item.name ||
      task.deadline !== item.deadline ||
      task.tag?.name !== item.tag?.name

  if (!changed) return
  if (!item.name || item.name.trim() === '') return

  const normalizedDeadline = item.deadline === '' ? null : item.deadline

  const normalizedTagName = item.tag?.name || ''

  task.name = item.name
  task.deadline = normalizedDeadline
  task.tag = { name: normalizedTagName }

  todoStore.updateTodoItem(task.id, {
    name: task.name,
    deadline: normalizedDeadline,
    tag_name: normalizedTagName,
  })
}

async function handleRemoveTask(index) {
  const task = visibleItems.value[index] 
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
async function handleRemoveList() {
  const list = todoStore.todoLists.find(l => l.id === todoStore.todoList.id)
  const copy = todoStore.todoList
  if (!list) return
  list.deleted = true
  const newlists = todoStore?.todoLists.filter(list => !list.deleted)
  if(newlists.length > 0){
    todoStore.fetchTodoList(newlists[0].id)
    uiStore.currentList = newlists[0].id
    uiStore.editMode = false
  }else{
    uiStore.setNewTodoView()
  }
  let undone = false
  uiStore.showUndoNotification('Lista została usunięta', {
    onUndo: () => {
      list.deleted = false;
      undone = true;
      uiStore.showConfirmationNotification('Cofnięto usunięcie');
      todoStore.todoList = copy;
      uiStore.currentTodoObject = copy;
      uiStore.currentList = todoStore.todoList.id
    }
  })
  setTimeout(async () => {
    if (!undone) {
      await todoStore.removeTodoList(list.id)
    }
  }, 5100)
}
async function handleEditList() {
  await todoStore.updateTodoList()
}
</script>