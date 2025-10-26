<template>
  <AppHeader />
  <div class="entity-form">
    <h1>Edit Entity</h1>
    <BaseInput v-model="entity.firstName" label="First Name"/>
    <BaseInput v-model="entity.lastName" label="Last Name"/>
    <BaseInput v-model="entity.dob" label="Date of Birth" type="date"/>
    <BaseRadio v-model="entity.maritalStatus" label="Marital Status" :options="['Single','Married']"/>
    <BaseInput v-model="entity.address" label="Address"/>
    <BaseInput v-model="entity.phone" label="Phone"/>
    <BaseSelect v-model="entity.gender" label="Gender" :options="['Male','Female','Other']"/>
    <button @click="onSubmit">Update</button>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseRadio from './BaseRadio.vue'
import axios from 'axios'

export default {
  name:'UpdateEntity',
  components:{ AppHeader, BaseInput, BaseSelect, BaseRadio },
  data(){ return { entity:{} }},
  async mounted(){
    const id=this.$route.params.id
    const res=await axios.get(`http://localhost:3000/entities/${id}`)
    this.entity=res.data
  },
  methods:{
    async onSubmit(){
      try{
        await axios.put(`http://localhost:3000/entities/${this.entity.id}`,this.entity)
        alert('Entity updated successfully!')
        this.$router.push('/ReadEntity')
      }catch(err){ console.error(err) }
    }
  }
}
</script>
