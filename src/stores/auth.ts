import { defineStore } from 'pinia';
import router from '../router/index';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
      token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
      returnUrl: '/dashboard'
    }
  },
  actions: {
    async login(username: string, password: string) {
      const response = await fetch('http://localhost:8080/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 200) {
        const token = await response.text();
        localStorage.setItem('user', JSON.stringify(username));
        localStorage.setItem('token', JSON.stringify(token));
        this.user = username;
        this.token = token;
        console.log('Token', token)
        router.push(this.returnUrl || '/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }

    },
    logout() {
      this.user = '';
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
});