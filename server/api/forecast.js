export default defineEventHandler(async event => {
  const { cityId } = getQuery(event)

  const {
    weatherURL,
    weatherApiKey
  } = useRuntimeConfig()

  return await $fetch(weatherURL + `/forecast.json?key=${ weatherApiKey }&q=id:${ cityId }&days=3&aqi=no&alerts=no`)
})