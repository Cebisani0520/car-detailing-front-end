<template>
 <div class="d-flex align-items-center justify-content-center min-vh-100">
    <form class="p-5 border rounded shadow" @submit.prevent="onSubmit">
      <h2 class="mb-4">Login</h2>
      <div class="mb-3">
        <label for="email" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" aria-describedby="emailHelp" v-model="user.username" required>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-else>Login</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const user = reactive({
  username: '',
  password: '',
});
const loading = ref(false);

function onSubmit() {
  console.log(user);
  if (user.username != '' && user.password != '') {
    loading.value = true;
    useAuthStore().login(user.username, user.password);
  }
}
</script>