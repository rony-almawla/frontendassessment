<template>
  <AppHeader />
  <div class="entity-form">
    <h1>Edit Entity</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="entity.firstName" placeholder="First Name" required />
      <input v-model="entity.lastName" placeholder="Last Name" required />
      <input type="date" v-model="entity.dob" required />
      <input type="radio" value="Single" v-model="entity.maritalStatus" /> Single
      <input type="radio" value="Married" v-model="entity.maritalStatus" /> Married
      <input v-model="entity.address" placeholder="Address" required />
      <input v-model="entity.phone" placeholder="Phone" required />
      <select v-model="entity.gender" required>
        <option disabled value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import axios from 'axios'

export default {
  name: 'UpdateEntity',
  components: { AppHeader },
  data() {
    return {
      entity: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const res = await axios.get(`http://localhost:3000/entities/${id}`)
    this.entity = res.data
  },
  methods: {
    async onSubmit() {
      try {
        await axios.put(`http://localhost:3000/entities/${this.entity.id}`, this.entity)
        alert('Entity updated successfully!')
        this.$router.push('/ReadEntity')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
