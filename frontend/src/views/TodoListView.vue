
<template>
  <NewTodoList />
</template>


<script>
import {ref} from "vue";
import TodoList from "@/components/TodoList.vue";
import NewTodoList from "@/components/NewTodoList.vue";
export default {
  components: {
    TodoList,
    NewTodoList
  }
}
const newItem = ref('false')
</script>