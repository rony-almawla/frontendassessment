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
.base-select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}
</style>
