<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100">
      <form class="p-5 border rounded shadow">
        <h2 class="mb-4">Sign Up</h2>
  
        <div v-if="currentStep === 1">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input v-model="formData.step1.firstName" type="text" class="form-control" id="firstName">
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input v-model="formData.step1.lastName" type="text" class="form-control" id="lastName">
          </div>
          <button @click="nextStep" :disabled="!isStep1Valid" class="btn btn-primary">Next</button>
        </div>
  
        <div v-if="currentStep === 2">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="formData.step2.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="formData.step2.password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input v-model="formData.step2.confirmPassword" type="password" class="form-control" id="confirmPassword">
          </div>
          <button @click="prevStep" class="btn btn-secondary me-3">Previous</button>
          <button @click="submitForm" :disabled="!isStep2Valid" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import router from '../router'
  
  export default {
    data() {
      return {
        currentStep: 1,
        formData: {
          step1: {
            firstName: '',
            lastName: ''
          },
          step2: {
            email: '',
            password: '',
            confirmPassword: ''
          }
        }
      };
    },
    computed: {
      isStep1Valid() {
        return this.formData.step1.firstName.trim() !== '' && this.formData.step1.lastName.trim() !== '';
      },
      isStep2Valid() {
        return (
          this.formData.step2.email.trim() !== '' &&
          this.formData.step2.password.trim() !== '' &&
          this.formData.step2.password === this.formData.step2.confirmPassword
        );
      }
    },
    methods: {
      nextStep() {
        this.currentStep += 1;
      },
      prevStep() {
        this.currentStep -= 1;
      },
      submitForm() {
        if (this.isStep2Valid) {
          this.$router.push('/dashboard');
          console.log('Form submitted successfully');
        }
      }
    }
  };
  </script>
  
  <style>
  
  </style>
  