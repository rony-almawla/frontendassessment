<template>
  <AppHeader />
  <div class="entity-form">
    <h1>Edit Entity</h1>

    <form @submit.prevent="onSubmit">
      <BaseInput v-model="entity.firstName" placeholder="First Name" required />
      <BaseInput v-model="entity.lastName" placeholder="Last Name" required />
      
      <label>Date of Birth</label>
      <input type="date" v-model="entity.dob" required />

      <label>Marital Status</label>
      <BaseRadio v-model="entity.maritalStatus" :options="['Single','Married']" />

      <BaseInput v-model="entity.address" placeholder="Address" required />
      <BaseInput v-model="entity.phone" type="tel" placeholder="Phone" required />
      <BaseSelect v-model="entity.gender" :options="['Male','Female','Other']" required />

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

      <button type="submit">Update Entity</button>
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
  name: 'UpdateEntity',
  components: { AppHeader, BaseInput, BaseSelect, BaseRadio },
  data() {
    return {
      entity: {},
      profilePic: null,
      profilePicPreview: null
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id
      const res = await axios.get(`http://localhost:3000/entities/${id}`)
      this.entity = res.data
      if (this.entity.profilePic) {
        this.profilePicPreview = this.entity.profilePic // base64 or URL
      }
    } catch (err) {
      console.error('Failed to load entity:', err)
      alert('Error loading entity data.')
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
        // If a new profile picture was uploaded
        if (this.profilePic) {
          const reader = new FileReader()
          reader.onload = async () => {
            // Convert image to base64 and attach to entity
            this.entity.profilePic = reader.result

            // Send as JSON
            await axios.put(`http://localhost:3000/entities/${this.entity.id}`, this.entity)

            alert('Entity updated successfully!')
            this.$router.push('/ReadEntity')
          }
          reader.readAsDataURL(this.profilePic)
        } else {
          // No new image, just update text fields
          await axios.put(`http://localhost:3000/entities/${this.entity.id}`, this.entity)
          alert('Entity updated successfully!')
          this.$router.push('/ReadEntity')
        }
      } catch (err) {
        console.error('Error updating entity:', err)
        alert('Failed to update entity.')
      }
    }
  }
}
</script>


<style scoped>
.entity-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.entity-form h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}


.entity-form input,
.entity-form select,
.base-input,
.base-select {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.entity-form input:focus,
.entity-form select:focus,
.base-input:focus,
.base-select:focus {
  border-color: #5dade2;
  box-shadow: 0 0 10px rgba(93,173,226,0.2);
  outline: none;
}

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
