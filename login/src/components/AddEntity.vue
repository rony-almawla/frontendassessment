<template>
  <AppHeader />
  <div class="entity-form">
    <h1>Add Entity</h1>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <BaseInput v-model="firstName" placeholder="First Name" required />
      <BaseInput v-model="lastName" placeholder="Last Name" required />
      <label>Date of Birth</label>
      <input type="date" v-model="dob" required />

      <label>Marital Status</label>
      <BaseRadio v-model="maritalStatus" :options="['Single', 'Married']" />

      <BaseInput v-model="address" placeholder="Address" required />
      <BaseInput v-model="phone" type="tel" placeholder="8-digit Phone" required />

      <label>Gender</label>
      <BaseSelect v-model="gender" :options="['Male','Female','Other']" required />

      <div>
        <label>Profile Picture</label>
        <input type="file" @change="onFileChange" />
      </div>

      <button type="submit">Add Entity</button>
    </form>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseRadio from './BaseRadio.vue'
import axios from 'axios'

export default {
  name: 'AddEntity',
  components: { AppHeader, BaseInput, BaseSelect, BaseRadio },
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      maritalStatus: 'Single',
      address: '',
      phone: '',
      gender: '',
      profilePic: null
    }
  },
  methods: {
    onFileChange(event) {
      this.profilePic = event.target.files[0]
    },
    async onSubmit() {
      try {
        const entityData = {
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          maritalStatus: this.maritalStatus,
          address: this.address,
          phone: this.phone,
          gender: this.gender,
          profilePic: this.profilePic ? this.profilePic.name : ''
        }

        await axios.post('http://localhost:3000/entities', entityData)
        alert('Entity added successfully!')
        this.$router.push('/ReadEntity')
      } catch (err) {
        console.error(err)
        alert('Failed to add entity.')
      }
    }
  }
}
</script>

<style scoped>
.entity-form {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
button {
  padding: 10px 20px;
  background-color: #5dade2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover { background-color: #5499c7; }
</style>
