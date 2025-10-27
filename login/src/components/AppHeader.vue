<template>
  <header class="header">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/AddEntity">Add Entity</router-link>
      <router-link to="/ReadEntity">Read Entity</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>

 .nav {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  padding: 15px 30px;
  display: flex;
  justify-content: flex-start;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.nav a {
  color: #fff;
  padding: 10px 18px;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

</style>

