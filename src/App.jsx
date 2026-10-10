// APC 440 Weather App, Module 9.
// Searches for a city or US ZIP code and shows live weather from Open-Meteo.

import { useState } from 'react'
import LocationSearch from './components/LocationSearch.jsx'
import CurrentConditions from './components/CurrentConditions.jsx'
import ForecastList from './components/ForecastList.jsx'
import Attribution from './components/Attribution.jsx'
import StatusMessage from './components/StatusMessage.jsx'

export default function App() {
  // Where the search is up to. It goes 'idle' -> 'locating' -> 'loading' -> 'success',
  // and each new search starts again at 'locating'.
  const [status, setStatus] = useState('idle')

  // The place we found, e.g. { name: 'Platteville', admin1: 'Wisconsin', ... }.
  // null until the first search finishes.
  const [place, setPlace] = useState(null)

  // The weather for that place, straight from the Open-Meteo forecast API.
  // null until the first search finishes.
  const [forecast, setForecast] = useState(null)

  // Called by LocationSearch with the trimmed search text.
  // "async" lets us use "await", which pauses this function until each
  // request comes back, without freezing the page.
  async function handleSearch(query) {
    setStatus('locating')

    // Step 1: turn the city name or ZIP code into a place with a latitude and longitude.
    // URLSearchParams builds the "?name=...&count=5..." part and escapes
    // spaces and other special characters for us.
    const geocodingParams = new URLSearchParams({
      name: query,
      count: 5,
      countryCode: 'US',
    })
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${geocodingParams}`
    )
    const geocodingData = await geocodingResponse.json()
    // Use the first match.
    const foundPlace = geocodingData.results[0]

    setStatus('loading')

    // Step 2: get the weather for that latitude and longitude.
    // "current" and "daily" list the fields our components read.
    const forecastParams = new URLSearchParams({
      latitude: foundPlace.latitude,
      longitude: foundPlace.longitude,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      timezone: 'auto',
    })
    const forecastResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?${forecastParams}`
    )
    const forecastData = await forecastResponse.json()

    // Save both together, after both requests are done, so the name on
    // screen always matches the weather under it.
    setPlace(foundPlace)
    setForecast(forecastData)
    setStatus('success')
  }

  // Turn off the Search button while a search is running. This is worked out
  // from status on every render instead of being stored as its own state,
  // so it can never disagree with status.
  const isSearching = status === 'locating' || status === 'loading'

  return (
    <main className="app">
      <h1>Weather App</h1>

      <LocationSearch onSearch={handleSearch} disabled={isSearching} />

      <StatusMessage status={status} />

      {/* Show the weather and the credit only when the search has finished.
          If the left side is false, React renders nothing. */}
      {status === 'success' && (
        <>
          <CurrentConditions
            name={place.name}
            region={place.admin1}
            current={forecast.current}
          />

          <ForecastList daily={forecast.daily} />

          <Attribution />
        </>
      )}
    </main>
  )
}
