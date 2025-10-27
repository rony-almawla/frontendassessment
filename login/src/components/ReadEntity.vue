<template>
  <AppHeader />
  <div class="entity-list">
    <h1>Entities</h1>
    <input v-model="searchQuery" placeholder="Search by name..."/>
    <table>
      <thead>
        <tr>
          <th>Profile</th><th>First Name</th><th>Last Name</th><th>Marital Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in filteredEntities" :key="entity.id">
          <td><img :src="entity.profilePic" width="50"/></td>
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
  name:'ReadEntity',
  components:{ AppHeader },
  data(){ return { entities:[], searchQuery:'' } },
  computed:{
    filteredEntities(){ return this.entities.filter(e=>e.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) || e.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())) }
  },
  async mounted(){ await this.fetchEntities() },
  methods:{
    async fetchEntities(){ try{ const res=await axios.get('http://localhost:3000/entities'); this.entities=res.data }catch(err){ console.error(err)}},
    async deleteEntity(id){
      if(!confirm('Are you sure?')) return
      try{ await axios.delete(`http://localhost:3000/entities/${id}`); this.entities=this.entities.filter(e=>e.id!==id) }catch(err){ console.error(err)}
    }
  }
}
</script>

<style scoped>
/* .entity-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #fefefe;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.entity-form h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-weight: 700;
}

.entity-form form > * {
  margin-bottom: 20px;
}

button {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(90deg, #5a67d8, #6b46c1);
  transform: translateY(-2px);
}

input[type="file"] {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}

input[type="file"]:hover {
  border-color: #667eea;
}

label {
  font-weight: 600;
  color: #555;
} */
 .entity-list {
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.entity-list h1 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  color: #333;
}

.entity-list input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f7f7f7;
  font-weight: 600;
  color: #333;
}

tr:hover {
  background-color: #f1f5fb;
  transition: all 0.3s ease;
}

img {
  border-radius: 50%;
  object-fit: cover;
}

button {
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:first-child {
  background: #667eea;
  color: #fff;
  margin-right: 5px;
}

button:first-child:hover {
  background: #5a67d8;
}

button:last-child {
  background: #e74c3c;
  color: #fff;
}

button:last-child:hover {
  background: #c0392b;
}

</style>
