async function getApi(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Could not fetch. Status code: ${response.status}`)
    }
    return data
  } catch (error) {
    throw new Error(`Could not fetch. Error: ${error.message}`)
  }
}

async function getConcurrentApi(urls) {
  try {
    const promises = urls.map(async (url) => {
      const response = await fetch(url)
      return response.json()
    })
    const results = await Promise.all(promises)
    return results
  } catch (error) {
    throw new Error(`Could not fetch. Error: ${error.message}`)
  }
}

export { getApi, getConcurrentApi }
