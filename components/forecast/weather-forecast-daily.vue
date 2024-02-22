<template>
  <div class="weather-forecast-daily">
    <div class="location">
      <h2>Город: {{ cityName }}</h2>

      <h2>Регион: {{ regionName }}</h2>

      <h2>Страна: {{ countryName }}</h2>
    </div>

    <img :src="imgSrc" alt="">

    <div class="params">
      <h2>Температура {{ temperature }} {{ temperaturePostFix }}</h2>

      <h2>Ощущается как {{ feelsLike }} {{ temperaturePostFix }}</h2>

      <h2>Скорость ветра {{ windSpeed }} км/ч</h2>

      <h2>Влажность {{ humidity }}%</h2>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    location: {
      type: Object,
      default() {
        return {}
      }
    },

    weather: {
      type: Object,
      default() {
        return {}
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


  const cityName = computed(() => {
    return props.location?.name
  })

  const regionName = computed(() => {
    return props.location?.region
  })

  const countryName = computed(() => {
    return props.location?.country
  })


  const feelsLike = computed(() => {
    if (props.selectedTemperatureUnit === "Fahrenheit") {
      return props.weather?.feelslike_f
    }

    if (props.selectedTemperatureUnit === "Kelvin") {
      return props.weather?.feelslike_c + 273
    }

    return props.weather?.feelslike_c
  })

  const humidity = computed(() => {
    return props.weather?.humidity
  })

  const temperature = computed(() => {
    if (props.selectedTemperatureUnit === "Fahrenheit") {
      return props.weather?.temp_f
    }

    if (props.selectedTemperatureUnit === "Kelvin") {
      return props.weather?.temp_c + 273
    }

    return props.weather?.temp_c
  })

  const windSpeed = computed(() => {
    return props.weather?.wind_kph
  })


  const imgSrc = computed(() => {
    return "https:" + props.weather?.condition?.icon.replaceAll('64', '128')
  })
</script>

<style lang="sass" scoped>
.weather-forecast-daily
  width: 100%
  padding: 10px 50px
  +border-radius(10px)
  border: 4px solid $blue-500
  background-color: $blue-100
  justify-content: space-between
  align-items: center
  display: flex

  @media not all and (min-width: 768px)
    flex-direction: column
    text-align: center
    padding: 10px

  > .location
    display: flex
    flex-direction: column
    gap: 10px
    width: 100%
    flex: 1

  > .params
    display: flex
    flex-direction: column
    align-items: flex-end
    gap: 10px
    width: 100%
    flex: 1

    @media not all and (min-width: 768px)
      align-items: center
</style>