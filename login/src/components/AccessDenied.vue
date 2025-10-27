<template>
  <div class="error-card">
    <h1>🚫 Access Denied</h1>
    <p>You must be logged in to view this page.</p>
    <button @click="$router.push('/login')">Go to Login</button>
  </div>
</template>

<style scoped>
.error-card {
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #e74c3c;
}

p {
  font-size: 16px;
  margin-bottom: 25px;
  color: #555;
}

button {
  width: 100%;
  padding: 12px 0;
  background-color: #5dade2;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #5499c7;
  transform: translateY(-2px);
}
</style>
