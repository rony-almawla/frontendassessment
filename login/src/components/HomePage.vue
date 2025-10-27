<template>
  <AppHeader />
  <div class="home">
    <h1>Welcome, {{ userName }}</h1>
    <p>Email: {{ userEmail }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'

export default {
  name: 'HomePage',
  components: { AppHeader }, 
  setup() {
    const userName = ref('')
    const userEmail = ref('')

    onMounted(() => {
      const token = localStorage.getItem('jwt-token')
      const userInfo = localStorage.getItem('user-info')

      if (!token || !userInfo) return window.location.href = '/login'

      try {
        const parsedToken = JSON.parse(atob(token))
        if (Date.now() > parsedToken.exp) {
          localStorage.removeItem('jwt-token')
          localStorage.removeItem('user-info')
          return window.location.href = '/login'
        }

        const user = JSON.parse(userInfo)
        userName.value = user.name
        userEmail.value = user.email
      } catch {
        localStorage.removeItem('jwt-token')
        localStorage.removeItem('user-info')
        window.location.href = '/login'
      }
    })

    const logout = () => {
      localStorage.removeItem('jwt-token')
      localStorage.removeItem('user-info')
      window.location.href = '/login'
    }

    return { userName, userEmail, logout }
  }
}
</script>

<style scoped>
/* .home {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #5dade2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #5499c7;
} */
 .home {
  max-width: 550px;
  margin: 60px auto;
  padding: 40px;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.home h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.home p {
  font-size: 16px;
  color: #666;
  margin-bottom: 25px;
}

button {
  padding: 14px 30px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(90deg, #5a67d8, #6b46c1);
  transform: translateY(-2px);
}

</style>
