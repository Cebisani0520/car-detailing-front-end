<template>
 <h2> Home Page </h2>
 <SideBar />
<LoginForm />
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import SideBar from '@/components/SideBar.vue';
export default {
  components: {LoginForm, SideBar}
  

}
</script>

<style>

</style>
