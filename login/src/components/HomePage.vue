<template>
  <div class="home">
    <h1>Welcome, {{ userName }}</h1>
    <p>Email: {{ userEmail }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'HomePage',
  setup() {
    const userName = ref('')
    const userEmail = ref('')

    onMounted(() => {
      const token = localStorage.getItem('jwt-token')
      const userInfo = localStorage.getItem('user-info')

      if (!token || !userInfo) {
        window.location.href = '/login'
        return
      }

      try {
        const parsedToken = JSON.parse(atob(token))
        if (Date.now() > parsedToken.exp) {
          localStorage.removeItem('jwt-token')
          localStorage.removeItem('user-info')
          window.location.href = '/login'
          return
        }

        const user = JSON.parse(userInfo)
        userName.value = user.name
        userEmail.value = user.email
      } catch {
        // If token or user info is corrupted
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
.home {
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
}
</style>
