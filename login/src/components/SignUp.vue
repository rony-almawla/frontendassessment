<template>
  <div class="register">
    <h1>Sign Up</h1>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div>
        <label>Name</label>
        <Field name="name" placeholder="Enter your name" />
        <ErrorMessage name="name" class="error" />
      </div>

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
        <span v-if="loading">Signing up...</span>
        <span v-else>Sign Up</span>
      </button>
    </Form>

    <p style="margin-top: 15px">
      Already have an account?
      <a href="#" @click.prevent="goLogin">Login</a>
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
  name: 'SignUpPage',
  components: { Form, Field, ErrorMessage },
  setup() {
    const loading = ref(false)

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required').email('Invalid email format'),
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    })

    const onSubmit = async (values) => {
      loading.value = true
      try {
        const safeName = DOMPurify.sanitize(values.name).trim()
        const safeEmail = DOMPurify.sanitize(values.email).trim()
        const safePassword = DOMPurify.sanitize(values.password).trim()
        const hashedPassword = bcrypt.hashSync(safePassword, 10)

        const usersRes = await axios.get('http://localhost:3000/users')
        if (usersRes.data.some(u => u.email.toLowerCase() === safeEmail.toLowerCase())) {
          alert('Email already registered')
          return
        }

        await axios.post('http://localhost:3000/users', {
          name: safeName,
          email: safeEmail,
          password: hashedPassword
        })

        const token = btoa(JSON.stringify({ email: safeEmail, exp: Date.now() + 3600000 }))
        localStorage.setItem('jwt-token', token)

        alert('Signup successful! Please login.')
        window.location.href = '/login'
      } catch (err) {
        console.error(err)
        alert('Signup failed. Check console.')
      } finally {
        loading.value = false
      }
    }

    const goLogin = () => window.location.href = '/login'

    return { schema, loading, onSubmit, goLogin }
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register input {
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  padding-left: 15px;
  border: 1px solid #c3cfe2;
  border-radius: 6px;
  font-size: 16px;
}

.register button {
  width: 100%;
  height: 45px;
  background-color: #5dade2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.register button:disabled {
  background-color: #a9cce3;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
