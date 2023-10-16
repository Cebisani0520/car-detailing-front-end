<template>
    <div class="w-100 h-100 d-flex">
      Home Page Here
    </div>
    
  </template>
  

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
    components: {NavBar, SideBar},
    data(){
        return {openSidebar: true }
    },
    methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    }
  }
}
</script>

<style></style>