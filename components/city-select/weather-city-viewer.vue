<template>
  <div class="weather-city-viewer">
    <h2>Город: {{ cityName }}</h2>

    <h2>Регион: {{ region }}</h2>

    <h2>Страна: {{ country }}</h2>
  </div>
</template>

<script setup>
  const {
    cityName,
    region,
    country
  } = defineProps({
    cityName: {
      type: String,
      default: ""
    },

    region: {
      type: String,
      default: ""
    },

    country: {
      type: String,
      default: ""
    }
  })
</script>

<style lang="sass" scoped>
.weather-city-viewer
  background-color: $blue-500
  border: 3px solid $blue-700
  padding: 20px
  text-align: center
  color: $blue-50
  +border-radius(10px)
  display: flex
  flex-direction: column
  gap: 10px
  align-items: center
  cursor: pointer
  +user-select(none)

  &:hover
    background-color: $blue-600
    border: 3px solid $blue-800

  &:active
    padding: 22px 20px 18px
    background-color: $blue-600
    border: 3px solid $blue-800
</style>