export default defineEventHandler(async (event) => {
  const { userInput } = getQuery(event)

  const {
    weatherURL,
    weatherApiKey
  } = useRuntimeConfig()

  return await $fetch(weatherURL + `/search.json?key=${ weatherApiKey }&q=${ userInput }`)
})