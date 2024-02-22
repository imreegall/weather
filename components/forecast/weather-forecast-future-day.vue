<template>
  <div class="weather-forecast-future-day">
    <h2>{{ date }}</h2>

    <div class="params">
      <h2>Температура {{ temperature }} {{ temperaturePostFix }}</h2>

      <h2>Скорость ветра {{ windSpeed }} км/ч</h2>

      <h2>Влажность {{ humidity }}%</h2>
    </div>

    <img :src="imgSrc" alt="">
  </div>
</template>

<script setup>
  const props = defineProps({
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

  const date = computed(() => {
    const timestamp = props.weather?.date

    const date = new Date(timestamp)

    const dateFormatTemplate = Intl.DateTimeFormat('ru-ru', {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    const formattedDate = dateFormatTemplate.format(date)

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  })

  const humidity = computed(() => {
    return props.weather?.day.avghumidity
  })

  const temperature = computed(() => {
    if (props.selectedTemperatureUnit === "Fahrenheit") {
      return props.weather?.day.avgtemp_f
    }

    if (props.selectedTemperatureUnit === "Kelvin") {
      return props.weather?.day.avgtemp_c + 273
    }

    return props.weather?.day.avgtemp_c
  })

  const windSpeed = computed(() => {
    return props.weather?.day.maxwind_kph
  })

  const imgSrc = computed(() => {
    return "https:" + props.weather?.day.condition?.icon.replaceAll('64', '128')
  })
</script>

<style lang="sass" scoped>
.weather-forecast-future-day
  border: 4px solid $blue-500
  background-color: $blue-100
  padding: 20px
  +border-radius(10px)
  display: flex
  flex-direction: column
  gap: 20px
  align-items: center
  text-align: center

  > .params
    display: flex
    flex-direction: column
    gap: 10px
    align-items: center
</style>