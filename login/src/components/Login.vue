<template>
  <div class="login">
    <h1>Login</h1>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div>
        <label>Email</label>
        <Field name="email" type="email" placeholder="Enter your email" />
        <ErrorMessage name="email" class="error" />
      </div>

      <div>
        <label>Password</label>
        <Field name="password" type="password" placeholder="Enter your password" />
        <ErrorMessage name="password" class="error" />
      </div>

      <button type="submit" :disabled="loading">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </Form>

    <p style="margin-top: 15px">
      Don't have an account? 
      <a href="#" @click.prevent="goSignup">Sign Up</a>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import DOMPurify from 'dompurify'

export default {
  name: 'LoginPage',
  components: { Form, Field, ErrorMessage },
  setup() {
    const loading = ref(false)

    const schema = yup.object({
      email: yup.string().required('Email is required').email('Invalid email format'),
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    })

    const onSubmit = async (values) => {
      loading.value = true
      try {
        const safeEmail = DOMPurify.sanitize(values.email).trim()
        const safePassword = DOMPurify.sanitize(values.password).trim()

        const response = await axios.get('http://localhost:3000/users')
        const user = response.data.find(
          u => u.email.toLowerCase() === safeEmail.toLowerCase() &&
               bcrypt.compareSync(safePassword, u.password)
        )

        if (!user) {
          alert('Invalid email or password') 
          return
        }

        let token = localStorage.getItem('jwt-token')
        if (!token) {
          token = btoa(JSON.stringify({ email: user.email, exp: Date.now() + 3600000 }))
          localStorage.setItem('jwt-token', token)
        }

        localStorage.setItem('user-info', JSON.stringify(user))
        window.location.href = '/'
      } catch (err) {
        console.error(err)
        alert('Login failed. Check console.')
      } finally {
        loading.value = false
      }
    }

    const goSignup = () => window.location.href = '/sign-up'

    return { schema, loading, onSubmit, goSignup }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
  display: block;
  text-align: left;
}

.login {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login input {
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  padding-left: 15px;
  border: 1px solid #c3cfe2;
  border-radius: 6px;
  font-size: 16px;
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
</style>
