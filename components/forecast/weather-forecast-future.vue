<template>
  <div class="weather-forecast-future">
    <weather-forecast-future-day
      v-for="weather in weatherArray"
      :weather="weather"

      :temperature-post-fix="temperaturePostFix"
      :selected-temperature-unit="selectedTemperatureUnit"
    />
  </div>
</template>

<script setup>
  import WeatherForecastFutureDay from "~/components/forecast/weather-forecast-future-day.vue";

  const props = defineProps({
    weatherArray: {
      type: Array,
      default() {
        return []
      }
    },

    temperaturePostFix: {
      type: String,
      default: ""
    },

    selectedTemperatureUnit: {
      type: String,
      default: ""
    }
  })
</script>

<style lang="sass" scoped>
.weather-forecast-future
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 10px
  width: 100%

  @media not all and (min-width: 1280px)
    grid-template-columns: repeat(1, 1fr)
</style>