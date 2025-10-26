<template>
  <div class="register">
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <BaseInput v-model="name" placeholder="Name" required />
      <BaseInput v-model="email" placeholder="Email" type="email" required />
      <BaseInput v-model="password" placeholder="Password" type="password" required />

      <button type="submit">Sign Up</button>
    </form>
    <p>
      Already have an account?
      <a href="#" @click.prevent="goLogin">Login</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import bcrypt from 'bcryptjs'
import BaseInput from './BaseInput.vue'

export default {
  name: 'SignUpPage',
  components: { BaseInput },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        const hashedPassword = bcrypt.hashSync(this.password, 10)
        const usersRes = await axios.get('http://localhost:3000/users')
        if (usersRes.data.some(u => u.email.toLowerCase() === this.email.toLowerCase())) {
          return alert('Email already registered')
        }

        await axios.post('http://localhost:3000/users', {
          name: this.name,
          email: this.email,
          password: hashedPassword
        })

        alert('Signup successful! Please login.')
        this.$router.push('/login')
      } catch (err) {
        console.error(err)
        alert('Signup failed')
      }
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.register {
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
