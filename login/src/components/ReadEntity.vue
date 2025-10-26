<template>
  <AppHeader />
  <div class="entity-list">
    <h1>Entities</h1>

    <input v-model="searchQuery" placeholder="Search by name..." />

    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Marital Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in filteredEntities" :key="entity.id">
          <td>
            <img :src="entity.profilePic" alt="Profile" width="50" height="50" />
          </td>
          <td>{{ entity.firstName }}</td>
          <td>{{ entity.lastName }}</td>
          <td>{{ entity.maritalStatus }}</td>
          <td>
            <button @click="$router.push(`/UpdateEntity/${entity.id}`)">Edit</button>
            <button @click="deleteEntity(entity.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import axios from 'axios'

export default {
  name: 'ReadEntity',
  components: { AppHeader },
  data() {
    return {
      entities: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredEntities() {
      return this.entities.filter(e => 
        e.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        e.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  async mounted() {
    await this.fetchEntities()
  },
  methods: {
    async fetchEntities() {
      try {
        const res = await axios.get('http://localhost:3000/entities')
        this.entities = res.data
      } catch (err) {
        console.error(err)
      }
    },
    async deleteEntity(id) {
      if (!confirm('Are you sure you want to delete this entity?')) return
      try {
        await axios.delete(`http://localhost:3000/entities/${id}`)
        this.entities = this.entities.filter(e => e.id !== id)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.entity-list {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
input {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #5dade2;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button:hover { background-color: #5499c7; }
</style>
