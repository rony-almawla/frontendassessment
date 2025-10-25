<template>
  <div class="login">
    <img class="logo" src="../assets/signup.png" alt="Logo" />
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label for="email">Email</label>
      <input
        id="email"
        type="text"
        v-model="email"
        ref="emailInput"
        autocomplete="username"
      />
      <span role="alert" class="error">{{ errors.email }}</span>

      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        autocomplete="current-password"
      />
      <span role="alert" class="error">{{ errors.password }}</span>

      <button type="submit" :disabled="loading" :aria-busy="loading">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>

    <p>
      <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import DOMPurify from 'dompurify'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const emailInput = ref(null)

    // Validation schema
    const schema = yup.object({
      email: yup.string().required('Email is required').email('Invalid email'),
      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
    })

    const { handleSubmit, errors } = useForm({ validationSchema: schema })

    onMounted(() => {
      emailInput.value.focus()
      const token = localStorage.getItem('jwt-token')
      if (token) {
        const payload = JSON.parse(atob(token))
        if (Date.now() < payload.exp) {
          window.location.href = '/'
        } else {
          localStorage.removeItem('jwt-token')
          localStorage.removeItem('user-info')
        }
      }
    })

    const onSubmit = handleSubmit(async () => {
      loading.value = true
      try {
        const safeEmail = DOMPurify.sanitize(email.value)
        const safePassword = DOMPurify.sanitize(password.value)

        const response = await axios.get('http://localhost:3000/users')
        const user = response.data.find(
          u =>
            u.email.toLowerCase() === safeEmail.toLowerCase() &&
            bcrypt.compareSync(safePassword, u.password)
        )

        if (user) {
          const token = btoa(
            JSON.stringify({ email: user.email, exp: Date.now() + 3600000 })
          )
          localStorage.setItem('jwt-token', token)
          localStorage.setItem('user-info', JSON.stringify(user))
          window.location.href = '/'
        } else {
          alert('Invalid email or password')
        }
      } catch (err) {
        console.error(err)
        alert('Login failed')
      } finally {
        loading.value = false
      }
    })

    return { email, password, loading, emailInput, errors, onSubmit }
  }
}
</script>

<style scoped>
.login {
  background-color: #fff;
  padding: 40px 30px;
  max-width: 400px;
  margin: 60px auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 20px;
}

.login input {
  width: 100%;
  height: 45px;
  margin-bottom: 15px;
  padding-left: 15px;
  border: 1px solid #c3cfe2;
  border-radius: 6px;
  font-size: 16px;
}

.login input:focus {
  outline: none;
  border-color: #5dade2;
  box-shadow: 0 0 5px rgba(93, 173, 226, 0.5);
}

.login button {
  width: 100%;
  height: 45px;
  background-color: #5dade2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.login button:disabled {
  background-color: #a9cce3;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 13px;
  display: block;
  text-align: left;
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .login {
    width: 90%;
    padding: 30px 20px;
  }
  .login input,
  .login button {
    height: 42px;
    font-size: 15px;
  }
}
</style>
