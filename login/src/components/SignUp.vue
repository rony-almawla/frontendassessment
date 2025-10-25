<template>
    <img class="logo" src="../assets/signup.png" />
<h1>Sign Up</h1>
<div class="register">
    <input type="text" v-model = "name" placeholder="Enter your name"/>
    <input type="text" v-model = "email"  placeholder="Enter your email"/>
    <input type="password" v-model = "password"  placeholder="Enter your password"/>
    <button v-on:click = "signUp">Sign Up</button>
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
            
            localStorage.setItem("userInfo", JSON.stringify(result.data));
            this.$router.push({name: 'HomePage'})
           }
           
        }
    }
}

</script>

<style>
.logo{
    width:100px
}
.register input{
    width:300px;
    height:40px;
    padding-left:20px;
    display:block;
    margin-bottom:30px;
    margin-right:auto;
    margin-left:auto;
    border: 1px solid skyblue;
} 
.register button{
    width:320px;
    height:40px;
    border:1px solid skyblue;
    background-color:skyblue;
    color:#fff;
    cursor:pointer;

}
</style>