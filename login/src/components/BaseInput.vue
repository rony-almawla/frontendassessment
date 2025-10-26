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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
