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
/* .register {
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
} */
 /* Container */
.register, .login {
  max-width: 400px;
  margin: 80px auto;
  padding: 50px 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Headings */
.register h1, .login h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

/* Inputs */
.register input, .login input,
.base-input {
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  transition: all 0.3s ease;
}

.register input:focus, .login input:focus, .base-input:focus {
  border-color: #5dade2;
  box-shadow: 0 0 10px rgba(93, 173, 226, 0.2);
  outline: none;
}

/* Buttons */
button {
  width: 100%;
  padding: 14px 0;
  margin-top: 10px;
  background-color: #5dade2;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #5499c7;
  transform: translateY(-2px);
}

/* Links */
p {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #555;
}

p a {
  color: #5dade2;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

p a:hover {
  color: #5499c7;
  text-decoration: underline;
}

/* Smooth spacing adjustments */
.register form > *, .login form > * {
  display: block;
}

.register input::placeholder, .login input::placeholder {
  color: #999;
  font-weight: 500;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .register, .login {
    padding: 35px 25px;
  }

  button {
    font-size: 15px;
  }
}

</style>
