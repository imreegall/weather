<template>
  <div class="weather-city-selector">
    <input
      type="text"
      name="city"
      v-model="cityInputValue"
      placeholder="Найти город"
      @input="handleChangeCityInput"
    >
  </div>
</template>

<script setup>
  const cityInputValue = ref(null)

  const emit = defineEmits(['updateCityInputValue'])

  function handleChangeCityInput() {
    emit('updateCityInputValue', cityInputValue.value)
  }
</script>

<style lang="sass" scoped>
.weather-city-selector
  > input
    width: 100%
    background-color: $gray-100
    border: 2px solid $gray-200
    +border-radius(10px)
    padding: 10px 20px
    font-family: Rubik, "Calibri Light", sans-serif
    font-weight: 600

    &::placeholder
      font-family: Rubik, "Calibri Light", sans-serif
      font-weight: 600
</style>