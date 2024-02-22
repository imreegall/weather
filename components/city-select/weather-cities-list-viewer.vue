<template>
  <div
    class="weather-cities-list-viewer"
    :class="{
      loading: isCitiesListLoading
    }"
  >
    <h2 class="title error" v-if="isSearchingError">Ошибка сервера. Попробуйте позже.</h2>

    <main v-else-if="!isCitiesListEmpty">
      <h2 class="title">Выберите город</h2>

      <div class="table">
        <weather-city-viewer
          v-for="city in props.citiesList"
          :city-name="city.name"
          :region="city.region"
          :country="city.country"
          @click="handleCitySelect(city.id)"
        />
      </div>
    </main>

    <h2 class="title" v-else-if="isEmptyServerResponse">Нет результатов</h2>
  </div>
</template>

<script setup>
  import WeatherCityViewer from "~/components/city-select/weather-city-viewer.vue";

  const props = defineProps({
    citiesList: {
      type: Array,
      default() {
        return []
      }
    },

    isCitiesListLoading: {
      type: Boolean,
      default: false
    },

    isEmptyServerResponse: {
      type: Boolean,
      default: false
    },

    isSearchingError: {
      type: Boolean,
      default: false
    }
  })

  const isCitiesListEmpty = computed(() => {
    return !props.citiesList.length
  })

  const emit = defineEmits(['selectCity'])

  const handleCitySelect = cityId => {
    emit('selectCity', cityId)
  }
</script>

<style lang="sass" scoped>
.weather-cities-list-viewer
  width: 100%
  position: relative

  &.loading
    +opacity(50)
    pointer-events: none
    cursor: default
    +user-select(none)

  > .title
    text-align: center
    width: 100%

    &.error
      color: $red-600

  > main
    width: 100%
    display: flex
    flex-direction: column
    gap: 10px
    align-items: center

    > .title
      text-align: center
      font-size: 30px

    > .table
      display: grid
      grid-template-columns: repeat(3, 1fr)
      gap: 10px
      width: 100%

      @media not all and (min-width: 1280px)
        grid-template-columns: repeat(2, 1fr)

      @media not all and (min-width: 768px)
        grid-template-columns: repeat(1, 1fr)
</style>