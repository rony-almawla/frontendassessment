<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <BaseInput v-model="email" placeholder="Email" type="email" required />
      <BaseInput v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account?
      <a href="#" @click.prevent="goSignup">Sign Up</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs'
import BaseInput from './BaseInput.vue'

export default {
  name: 'LoginPage',
  components: { BaseInput },
  data() {
    return { email: '', password: '' }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await axios.get('http://localhost:3000/users')
        const user = res.data.find(u => u.email === this.email && bcrypt.compareSync(this.password, u.password))
        if (!user) return alert('Invalid email or password')

        const token = btoa(JSON.stringify({ email: user.email, exp: Date.now() + 3600000 }))
        localStorage.setItem('jwt-token', token)
        localStorage.setItem('user-info', JSON.stringify(user))

        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert('Login failed')
      }
    },
    goSignup() { this.$router.push('/sign-up') }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #5dade2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
