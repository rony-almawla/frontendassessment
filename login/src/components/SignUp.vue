<template>
  <div class="register">
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <label for="name">Name</label>
      <input id="name" v-model="name" />
      <span class="error">{{ nameError }}</span>

      <label for="email">Email</label>
      <input id="email" v-model="email" />
      <span class="error">{{ emailError }}</span>

      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
      <span class="error">{{ passwordError }}</span>

      <button type="submit" :disabled="loading">
        <span v-if="loading">Signing up...</span>
        <span v-else>Sign Up</span>
      </button>
    </form>
        <p style="margin-top: 15px">
      Already have an account?
      <router-link :to="{ name: 'LoginPage' }">Login</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import DOMPurify from 'dompurify'

export default {
  name: 'SignUpPage',
  setup() {
    const loading = ref(false)

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required').email('Invalid email'),
      password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    })

    // Initialize form
    const { handleSubmit } = useForm({ validationSchema: schema })

    // Initialize fields
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    // Submit handler
    const onSubmit = handleSubmit(async () => {
      loading.value = true
      try {
        const safeName = DOMPurify.sanitize(name.value)
        const safeEmail = DOMPurify.sanitize(email.value)
        const safePassword = DOMPurify.sanitize(password.value)

        const hashedPassword = bcrypt.hashSync(safePassword, 10)

        const response = await axios.post('http://localhost:3000/users', {
          name: safeName,
          email: safeEmail,
          password: hashedPassword
        })

        localStorage.setItem('jwt-token', btoa(JSON.stringify({ email: safeEmail, exp: Date.now() + 3600000 })))
        localStorage.setItem('user-info', JSON.stringify(response.data))

        window.location.href = '/'
      } catch (err) {
        console.error('Sign up failed:', err)
        alert('Sign up failed. Check console.')
      } finally {
        loading.value = false
      }
    })

    return {
      name,
      email,
      password,
      nameError,
      emailError,
      passwordError,
      loading,
      onSubmit
    }
  }
}
</script>

<style scoped>
/* keep your original styles here */
</style>


<style scoped>
.register {
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

.register input {
  width: 100%;
  height: 45px;
  margin-bottom: 15px;
  padding-left: 15px;
  border: 1px solid #c3cfe2;
  border-radius: 6px;
  font-size: 16px;
}

.register input:focus {
  outline: none;
  border-color: #5dade2;
  box-shadow: 0 0 5px rgba(93, 173, 226, 0.5);
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
  display: block;
  text-align: left;
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .register {
    width: 90%;
    padding: 30px 20px;
  }
  .register input,
  .register button {
    height: 42px;
    font-size: 15px;
  }
}
</style>

