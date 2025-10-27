<template>
  <div class="radio-group">
    <label v-for="opt in options" :key="opt">
      <input
        type="radio"
        :value="opt"
        :checked="modelValue === opt"
        @change="$emit('update:modelValue', opt)"
      />
      {{ opt }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

 .radio-group label {
  margin-right: 20px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.radio-group input[type="radio"] {
  margin-right: 6px;
  accent-color: #667eea;
}

</style>
