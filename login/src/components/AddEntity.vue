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
      <BaseSelect v-model="gender" :options="['Male','Female']" required />

      <!-- Modern Drag & Drop Upload -->
      <div
        class="file-drop"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="onDrop"
        @click="triggerFileInput"
      >
        <input type="file" ref="fileInput" @change="onFileChange" hidden />
        <div v-if="profilePicPreview" class="preview">
          <img :src="profilePicPreview" alt="Profile Preview" />
          <p>Click or Drag & Drop to change</p>
        </div>
        <div v-else class="placeholder">
          <p>Drag & Drop Profile Picture Here</p>
          <p>or Click to Upload</p>
        </div>
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
      profilePic: null,
      profilePicPreview: null
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.profilePic = file
        this.profilePicPreview = URL.createObjectURL(file)
      }
    },
    onDrop(event) {
      const file = event.dataTransfer.files[0]
      if (file) {
        this.profilePic = file
        this.profilePicPreview = URL.createObjectURL(file)
      }
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
/* Form Container */
.entity-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* Form Heading */
.entity-form h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

/* BaseInput, Selects, Date, File */
.entity-form input,
.entity-form select,
.base-input,
.base-select {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px; /* spacing between fields */
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  line-height: 1.4; /* ensures placeholder text is centered */
  transition: all 0.3s ease;
}

/* Date input fixes */
.entity-form input[type="date"] {
  padding: 12px 16px;
  font-size: 15px;
  line-height: 1.4;
}

/* File input handled via drag-drop preview */
.file-drop {
  border: 2px dashed #5dade2;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-drop:hover {
  background-color: #f0f8ff;
  border-color: #5499c7;
}

.file-drop .placeholder p {
  margin: 5px 0;
  color: #555;
  font-weight: 500;
}

/* Live preview */
.preview img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.preview p {
  color: #555;
  font-weight: 500;
}

/* Input Focus */
.entity-form input:focus,
.entity-form select:focus,
.base-input:focus,
.base-select:focus {
  border-color: #5dade2;
  box-shadow: 0 0 10px rgba(93,173,226,0.2);
  outline: none;
}

/* Submit Button */
button {
  width: 100%;
  padding: 14px 0;
  background: #5dade2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  background: #5499c7;
  transform: translateY(-2px);
}

</style>
