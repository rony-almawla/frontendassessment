<template>
  <header class="header">
    <div class = "nav">
        <router-link to ='/'>Home</router-link>
        <router-link to ='/AddEntity'>Add Entity</router-link>
        <router-link to ='/ReadEntity'>Read Entity</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.nav{
    background-color:#333;
    overflow:hidden;
}
.nav a{
    float: left;
    color:#f2f2f2;
    padding:16px;
    text-align:center;
    font-size:10px;
    text-decoration:none;
    margin-right:5px;

}
.nav a:hover{
    background:#ddd;
    color:#333;
}
</style>
