<template>
  <SideBar />
  <div class="container mt-4">
    <h2 class="mt-4">Upcoming Events</h2>
    <ul class="list-group">
      <li v-for="event in events" :key="event.id" class="list-group-item">
        {{ event.customerId }} - {{ formatDate(event.date) }} 
      </li>
    </ul>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import Datepicker from 'vue3-datepicker';
import BookingService from '@/services/BookingService';
import { useAuthStore } from '@/stores/auth';

export default {
  components: {SideBar},
  data() {
    return {
      events: [],
      selectedDate: new Date(),
    };
  },
  computed: {
    filteredEvents() {
      const formattedDate = this.formatDate(this.selectedDate);
      return this.events.filter((event) => this.formatDate(event.date) === formattedDate);
    },
    limitedEvents() {
      return this.filteredEvents.slice(0, 5);
    },
  },
  methods: {
    async getBookings(){
      try {
        const token = useAuthStore().token;
        const response = await BookingService.getBookings(token);
        this.events = response.data;
        console.log(response);
        
      } catch (error) {
        console.log('Error getting Bookings: ', error);
        
      }
    },
    async formatDate(date) {
      return new Date(date).toDateString();
    },
    handleDateChange(date) {
      this.selectedDate = date;
    },
  },
  created(){
    this.getBookings();
  },
};
</script>

<style>

</style>
