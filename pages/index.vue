<template>
  <div class="page-container">
    <weather-header
      :temperature-units="temperatureUnits"
      :selected-temperature-unit="selectedTemperatureUnit"

      @change-temperature-unit="changeTemperatureUnit"
    />

    <weather-city-selector
      @update-city-input-value="updateCityInputValue"
    />

    <weather-cities-list-viewer
      :cities-list="citiesList"
      :is-cities-list-loading="isCitiesListLoading"
      :is-empty-server-response="isEmptyServerResponse"
      :is-searching-error="isSearchingError"

      @select-city="selectCity"
    />

    <weather-forecast
      v-if="isCitySelected"
      :selected-city-id="selectedCityId"

      :temperature-post-fix="temperaturePostFix"
      :selected-temperature-unit="selectedTemperatureUnit"
    />
  </div>
</template>

<script setup>
  import WeatherCitiesListViewer from "~/components/city-select/weather-cities-list-viewer.vue";
  import WeatherForecast from "~/components/forecast/weather-forecast.vue";
  import WeatherCitySelector from "~/components/city-select/weather-city-selector.vue";


  const temperatureUnits = [
    {
      title: "°C",
      name: "Celsius"
    },

    {
      title: "K",
      name: "Kelvin"
    },

    {
      title: "°F",
      name: "Fahrenheit"
    }
  ]

  const selectedTemperatureUnit = ref("Celsius")

  const temperaturePostFix = computed(() => {
    return temperatureUnits.find(unit => unit.name === selectedTemperatureUnit.value).title
  })

  const changeTemperatureUnit = unit => {
    selectedTemperatureUnit.value = unit
  }


  let citiesList = ref([])

  const isEmptyServerResponse = ref(false)

  const isCitiesListLoading = ref(false)

  const isSearchingError = ref(false)

  const updateCityInputValue = async userInput => {
    const cityName = userInput.trim()

    if (!cityName) {
      citiesList.value = []

      isEmptyServerResponse.value = false

      return
    }

    isCitiesListLoading.value = true

    await $fetch(`/api/search?userInput=${ cityName }`)
      .then(response => {
        isSearchingError.value = false

        if (typeof response === "object") {
          isEmptyServerResponse.value = !Object.keys(response).length
        }

        citiesList.value = response
      })
      .catch(error => {
        console.log("Searching city error:", error)

        isSearchingError.value = true
      })

    isCitiesListLoading.value = false
  }

  const selectedCityId = ref(-1)

  const isCitySelected = computed(() => {
    return selectedCityId.value >= 0
  })

  const selectCity = cityId => {
    selectedCityId.value = cityId
  }
</script>

<style lang="sass" scoped>
.page-container
  display: flex
  flex-direction: column
  gap: 20px
  padding: 30px 100px
  min-height: 100vh

  @media not all and (min-width: 1280px)
    padding: 30px 50px

  @media not all and (min-width: 768px)
    padding: 30px 20px
</style>