<template>
  <UserList @updated="handleUpdate"/>
</template>

<script setup>
import UserList from "@/components/UserList.vue";
import { useAdminStore } from "@/stores/adminStore.js";
const admin = useAdminStore()
function handleUpdate(payload){
  const id = payload.id
  const role_id = payload.role_id
  const max_lists = payload.max_lists
  const max_tasks_per_list = payload.max_tasks_per_list
  admin.updateUser(id, {role_id, max_lists, max_tasks_per_list})

}
</script>
