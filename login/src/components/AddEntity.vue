<template>
  <AppHeader />
  <div class="entity-form">
    <h1>Add Entity</h1>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div>
        <label>First Name</label>
        <input v-model="firstName" required />
      </div>

      <div>
        <label>Last Name</label>
        <input v-model="lastName" required />
      </div>

      <div>
        <label>Date of Birth</label>
        <input type="date" v-model="dob" required />
      </div>

      <div>
        <label>Marital Status</label>
        <input type="radio" value="Single" v-model="maritalStatus" /> Single
        <input type="radio" value="Married" v-model="maritalStatus" /> Married
      </div>

      <div>
        <label>Address</label>
        <input v-model="address" required />
      </div>

      <div>
  <label>Phone</label>
  <input 
    type="tel" 
    v-model="phone" 
    required 
    pattern="\d{8}" 
    placeholder="Enter 8-digit phone number" 
    title="Phone number must be exactly 8 digits" 
  />
</div>


      <div>
        <label>Gender</label>
        <select v-model="gender" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option> 
        </select>
      </div>

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
import axios from 'axios'

export default {
  name: 'AddEntity',
  components: { AppHeader },
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
        let entityData = {
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

.entity-form div {
  margin-bottom: 15px;
}

.entity-form input, .entity-form select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
}
button {
  padding: 10px 20px;
  background-color: #5dade2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #5499c7;
}
</style>
