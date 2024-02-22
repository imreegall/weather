<template>
  <div
    class="weather-forecast"
    :class="{
      loading: isForecastLoading
    }"
  >
    <template v-if="!isLoadingPage">
      <h2 v-if="isForecastError" class="title error">Ошибка загрузки прогноза погоды для выбранного города. Попробуйте позже.</h2>

      <template v-else>
        <weather-forecast-daily
          :location="location"
          :weather="currentWeather"

          :temperature-post-fix="temperaturePostFix"
          :selected-temperature-unit="selectedTemperatureUnit"
        />

        <weather-forecast-future
          :weather-array="futureWeatherArray"

          :temperature-post-fix="temperaturePostFix"
          :selected-temperature-unit="selectedTemperatureUnit"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
  import WeatherForecastDaily from "~/components/forecast/weather-forecast-daily.vue";
  import WeatherForecastFuture from "~/components/forecast/weather-forecast-future.vue";

  const props = defineProps({
    selectedCityId: {
      type: Number,
      default: -1
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

  const selectedCityForecast = ref(null)

  const location = computed(() => {
    return selectedCityForecast.value?.location
  })

  const currentWeather = computed(() => {
    return selectedCityForecast.value?.current
  })

  const futureWeatherArray = computed(() => {
    return selectedCityForecast.value?.forecast?.forecastday || []
  })

  const isForecastLoading = ref(false)

  const isForecastError = ref(false)

  const isLoadingPage = ref(true)

  watch(() => props.selectedCityId, async () => {
    if (props.selectedCityId < 0) {
      return
    }

    isForecastLoading.value = true

    await $fetch(`/api/forecast?cityId=${ props.selectedCityId }`)
      .then(response => {
        isForecastError.value = false

        selectedCityForecast.value = response
      })
      .catch(error => {
        console.log("Getting forecast error:", error)

        isForecastError.value = true
      })

    isLoadingPage.value = false

    isForecastLoading.value = false
  }, {
    immediate: true
  })
</script>

<style lang="sass" scoped>
.weather-forecast
  display: flex
  width: 100%
  flex-direction: column
  gap: 20px

  &.loading
    +opacity(50)
    pointer-events: none
    cursor: default
    +user-select(none)

  > .title
    text-align: center

    &.error
      color: $red-600
</style>