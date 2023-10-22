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
        <img :src="card.image" class="card-img-top" :alt="card.title" />
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
            title: 'Card 1 Title',
            description: 'Card 1 Description',
            image: 'https://via.placeholder.com/150'
          },
          {
            id: 2,
            title: 'Card 2 Title',
            description: 'Card 2 Description',
            image: 'https://via.placeholder.com/150'
          },
          {
            id: 3,
            title: 'Card 3 Title',
            description: 'Card 3 Description',
            image: 'https://via.placeholder.com/150'
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
  </style>
  