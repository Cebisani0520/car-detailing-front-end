<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>C</div>
        <div>D</div>

      </span>
      <span v-else>Car Detailing</span>
    </h1>

    <SidebarLink to="/dashboard" class="bi bi-columns-gap">Dashboard</SidebarLink>
    <SidebarLink to="/services" class="bi bi-gear-wide-connected">Services</SidebarLink>
    <SidebarLink to="/bookings" class="bi bi-calendar3">Bookings</SidebarLink>
    <SidebarLink to="/user" class="bi bi-person-gear">User</SidebarLink>
    <SidebarLink to="/address" class="bi bi-building-fill-add">Addresses</SidebarLink>
    <SidebarLink to="/employees" class="bi bi-person-add">Employees</SidebarLink>
    <SidebarLink to="/" class="bi bi-door-open" @click="handleLogout">Log Out</SidebarLink>

    <span
      class="bi bi-arrow-left-square"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar">
      <!-- <i class="bi bi-box-arrow-left" /> -->
    </span>

  </div>
</template>

<script>
import SidebarLink from '@/components/SidebarLink.vue';
import { collapsed, toggleSidebar, sidebarWidth } from './state';
import { useAuthStore } from '@/stores/auth';

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  methods: {
    handleLogout() {
      if (window.confirm('Are you sure you want to log out?')) {
        useAuthStore().logout();
        this.$router.push('/');
      } else {
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>