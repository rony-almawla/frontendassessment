<template>
  <select
    :id="id"
    v-bind="$attrs"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="base-select"
  >
    <option disabled value="">Select</option>
    <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: () => []
    },
    id: String
  }
}
</script>

<style scoped>
t {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: all 0.3s ease;
}

.base-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 10px rgba(102,126,234,0.2);
  outline: none;
}

</style>
