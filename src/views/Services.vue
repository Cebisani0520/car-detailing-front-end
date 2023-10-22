<template>
  <SideBar />
  <div class="container d-flex justify-content-center">
    <div
      v-for="card in cards"
      :key="card.id"
      class="card"
      @mouseover="handleHover(card.id)"
      @mouseleave="handleLeave(card.id)"
      :class="{ 'hovered': hoveredCard === card.id }"
      style="width: 15rem; margin: 15px;"
    >
      <!-- Replaced the image tag with Bootstrap icons -->
      <i
        :class="getIconClass(card.id)"
        class="card-img-top custom-icon"
      ></i>
      <div class="card-body">
        <h5 class="card-title">{{ card.title }}</h5>
        <p class="card-text">{{ card.description }}</p>
        <button class="btn btn-primary" @click="handleClick(card.id)">View</button>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  components: {SideBar},
  data() {
    return {
      cards: [
        {
          id: 1,
          title: 'Basic',
          description: 'Description',
        },
        {
          id: 2,
          title: 'Deluxe',
          description: 'Description',
        },
        {
          id: 3,
          title: 'Premium',
          description: 'Description',
        },
      ],
      hoveredCard: null
    };
  },
  methods: {
    handleHover(cardId) {
      this.hoveredCard = cardId;
    },
    handleLeave(cardId) {
      if (this.hoveredCard === cardId) {
        this.hoveredCard = null;
      }
    },
    handleClick(cardId) {
      console.log('Clicked Card ' + cardId);
    },
    getIconClass(id) {
      if (id === 1) {
        return 'bi bi-1-square';
      } else if (id === 2) {
        return 'bi bi-2-square';
      } else if (id === 3) {
        return 'bi bi-3-square';
      }
    }
  }
};
</script>

<style>
.card {
  transition: transform 0.3s;
}

.card.hovered {
  transform: scale(1.05);
}

.custom-icon {
  font-size: 4rem; /* Customize the font size as needed */
}
</style>
