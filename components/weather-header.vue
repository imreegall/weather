<template>
  <header>
    <div class="logo">
      <h1>ПОГОДА</h1>
    </div>

    <div class="buttons-group">
      <button
        v-for="temperatureUnit in props.temperatureUnits"
        :class="{
          active: selectedTemperatureUnit === temperatureUnit.name
        }"
        @click="handleTempUnitChangeButtonClick(temperatureUnit.name)"
      >
        {{ temperatureUnit.title }}
      </button>
    </div>
  </header>
</template>

<script setup>
  const props = defineProps({
    temperatureUnits: {
      type: Array,
      default() {
        return []
      }
    },

    selectedTemperatureUnit: {
      type: String,
      default: ""
    }
  })

  const emit = defineEmits(['changeTemperatureUnit'])

  const handleTempUnitChangeButtonClick = unit => {
    emit('changeTemperatureUnit', unit)
  }
</script>

<style lang="sass" scoped>
header
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center

  @media not all and (min-width: 768px)
    flex-direction: column
    gap: 20px

  > .logo
    font-size: 60px

  > .buttons-group
    display: flex
    align-items: center
    +border-radius(10px)
    overflow: hidden
    border: 4px solid black

    > button
      background-color: $blue-500
      font-family: Rubik, "Calibri Light", sans-serif
      font-weight: 600
      padding: 10px 20px
      line-height: 1
      cursor: pointer
      font-size: 30px

      @media not all and (min-width: 768px)
        font-size: 16px

      &:hover
        background-color: $blue-600

      &:active
        padding: 12px 20px 8px
        background-color: $blue-600

      &.active
        background-color: $blue-600
</style>