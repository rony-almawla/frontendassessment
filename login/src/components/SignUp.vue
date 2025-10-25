<!-- <template>
    <img class="logo" src="../assets/signup.png" />
<h1>Sign Up</h1>
<div class="register">
    <input type="text" v-model = "name" placeholder="Enter your name"/>
    <input type="text" v-model = "email"  placeholder="Enter your email"/>
    <input type="password" v-model = "password"  placeholder="Enter your password"/>
    <button v-on:click = "signUp">Sign Up</button>
    <p>
        <router-link to="login">Login</router-link>
    </p>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        async signUp() {
           let result = await axios.post("http://localhost:3000/users",{
                email : this.email,
                name : this.name,
                password : this.password
           });
           console.warn(result);
           if(result.status == 201){
            
            localStorage.setItem("user-info", JSON.stringify(result.data));
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

</script>
 -->

 <template>
  <img class="logo" src="../assets/signup.png" />
  <h1>Sign Up</h1>
  <div class="register">
    <input type="text" v-model="name" placeholder="Enter your name" />
    <input type="text" v-model="email" placeholder="Enter your email" />
    <input type="password" v-model="password" placeholder="Enter your password" />
    <button @click="signUp">Sign Up</button>
    <p>
      <router-link :to="{ name: 'LoginPage' }">Login</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
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
    async signUp() {
      try {
        // create a new user object
        const newUser = {
          name: this.name.trim(),
          email: this.email.trim().toLowerCase(),
          password: this.password.trim()
        }

        const response = await axios.post("http://localhost:3000/users", newUser)
        console.log("User created:", response.data)

        // store created user in localStorage
        localStorage.setItem("user-info", JSON.stringify(response.data))
        this.$router.push({ name: 'HomePage' })
      } catch (err) {
        console.error("SignUp error:", err)
        alert("Could not create user")
      }
    }
  }
}
</script>
