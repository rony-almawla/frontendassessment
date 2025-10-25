 <template>
    <h1>Hello User, Welcome to Home Page</h1>
</template>


<script>
export default {
  name: 'HomePage',
  mounted() {
    // Check JWT token
    const token = localStorage.getItem('jwt-token')
    if (!token) {
      this.$router.push({ name: 'LoginPage' })
    } else {
      const payload = JSON.parse(atob(token))
      if (Date.now() > payload.exp) {
        localStorage.removeItem('jwt-token')
        localStorage.removeItem('user-info')
        this.$router.push({ name: 'LoginPage' })
      }
    }
  }
}
</script>
