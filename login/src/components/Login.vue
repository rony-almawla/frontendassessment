<!-- <template>
    <img class="logo" src="../assets/signup.png" />
<h1>Login</h1>
<div class="login">
    <input type="text" v-model = "email"  placeholder="Enter your email"/>
    <input type="password" v-model = "password"  placeholder="Enter your password"/>
    <button v-on:click="login">Login</button>
    <p>
        <router-link to="sign-up">Sign Up</router-link>
    </p>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name:'LoginPage',
    data() {
        return {
            email:'',
            password:''
        }
    },
    methods: {
       async login()
        {
             let result = await axios.get(
    `http://localhost:3000/users?email=${this.email.trim()}&password=${this.password.trim()}`
)

            console.warn(result)
              if(result.status == 200 && result.data.length>0){
            
            localStorage.setItem("user-info", JSON.stringify(result.data[0]));
            this.$router.push({name: 'HomePage'})
           }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info')
        if(user){
            this.$router.push({name:'HomePage'})
        }
    }
}
</script> -->

<template>
  <img class="logo" src="../assets/signup.png" />
  <h1>Login</h1>
  <div class="login">
    <input type="text" v-model="email" placeholder="Enter your email" />
    <input type="password" v-model="password" placeholder="Enter your password" />
    <button @click="login">Login</button>
    <p>
      <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {
    // redirect if already logged in
    const user = localStorage.getItem('user-info')
    if (user) this.$router.push({ name: 'HomePage' })
  },
  methods: {
    async login() {
      try {
        const response = await axios.get("http://localhost:3000/users")
        console.log("All users:", response.data)

        // find matching user
        const user = response.data.find(u =>
          u.email.toLowerCase() === this.email.trim().toLowerCase() &&
          u.password === this.password.trim()
        )

        console.log("Matched user:", user)

        if (user) {
          localStorage.setItem("user-info", JSON.stringify(user))
          this.$router.push({ name: 'HomePage' })
        } else {
          alert("Invalid email or password")
        }
      } catch (err) {
        console.error("Login error:", err)
        alert("Could not connect to server")
      }
    }
  }
}
</script>
