<template>
  <SideBar />
  <div class="container">
    <h1>Bookings</h1>
    <h3>{{ currentMonthYear }}</h3>
    <div class="calendar">
      <div class="header">
        <button @click="previousMonth">&lt;</button>
        <span>{{ currentMonth }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="days">
        <div v-for="day in daysInMonth" :key="day" :class="['day', hasEvents(day) ? 'highlight' : '']">
          <div class="day-number">{{ day }}</div>
          <div class="events">
            <div v-for="event in eventsByDate(getDateFromDay(day))" :key="event.id" class="event">
              <div class="event-title">{{ event.title }}</div>
            </div>
          </div>
          <div class="event-titles">
            <span v-for="event in eventsByDate(getDateFromDay(day))" :key="event.id" class="event-title">
              {{ event.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import moment from "moment";
import BookingService from '@/services/BookingService'
import { useAuthStore } from '@/stores/auth';

export default {
  components: {SideBar},
  data() {
    return {
      currentMonth: moment().format("MMMM"),
      currentYear: moment().format("YYYY"),
      events: [],
    };
  },
  computed: {
    daysInMonth() {
      return Array.from({ length: this.getTotalDaysInMonth() }, (_, i) => i + 1);
    },
    currentMonthYear() {
      return `${this.currentMonth} ${this.currentYear}`;
    },
  },
  methods: {
    async getBookings(){
      try {
        const token = useAuthStore().token;
        const response = await BookingService.getBookings(token);
        this.events = response.data;
        console.log(response);
        console.log(token);
        
      } catch (error) {
        console.log('Error getting Bookings: ', error);
        
      }
    },
    async formatDate(date) {
      return new Date(date).toDateString();
    },
    eventsByDate(day) {
      return this.events.filter((event) => {
        const eventDay = moment(event.date).date();
        const eventMonth = moment(event.date).format("MMMM");
        return eventDay === day && eventMonth === this.currentMonth;
      });
    },
    getTotalDaysInMonth() {
      return moment(`${this.currentYear}-${this.currentMonth}`, "YYYY-MMMM").daysInMonth();
    },
    getDateFromDay(day) {
      return moment(`${this.currentYear}-${this.currentMonth}-${day}`, "YYYY-MMMM-DD").format("YYYY-MM-DD");
    },
    hasEvents(day) {
      return this.eventsByDate(day).length > 0;
    },
    previousMonth() {
      const previousMonthDate = moment(`${this.currentYear}-${this.currentMonth}`, "YYYY-MMMM").subtract(1, "months");
      this.currentMonth = previousMonthDate.format("MMMM");
      this.currentYear = previousMonthDate.format("YYYY");
    },
    nextMonth() {
      const nextMonthDate = moment(`${this.currentYear}-${this.currentMonth}`, "YYYY-MMMM").add(1, "months");
      this.currentMonth = nextMonthDate.format("MMMM");
      this.currentYear = nextMonthDate.format("YYYY");
    },
  },
  created(){
    this.getBookings();
  },
};
</script>

<style>
.calendar {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.day {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100px;
  margin: 5px;
  position: relative;
}

.highlight {
  background-color: lightblue;
}

.day-number {
  font-weight: bold;
  margin-bottom: 10px;
}

.event {
  margin-bottom: 5px;
}

.event-title {
  font-weight: bold;
}

.event-date {
  font-size: 12px;
  color: #777;
}

.event-titles {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 5px;
}
</style>