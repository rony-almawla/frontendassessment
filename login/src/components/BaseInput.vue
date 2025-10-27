<template>
  <input
    :id="id"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="base-input"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: String,
    id: String
  }
}
</script>

<style scoped>

 .base-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  font-size: 14px;
}

.base-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 10px rgba(102,126,234,0.2);
  outline: none;
}

</style>
