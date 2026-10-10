# Weather App: Project Instructions for Claude Code

This is a student project for APC 440 (Web Development), Modules 8-10.
The student is learning React. Keep code readable and explain your choices.

## Stack
- React with Vite, plain JavaScript (no TypeScript)
- Plain CSS in src/styles.css (no CSS frameworks, no CSS-in-JS)
- Install dependencies with `npm ci`. package-lock.json fixes the versions.
- Do not add npm packages unless the student asks. If you add one, say so
  and remind the student to commit package-lock.json.

## Components and responsibilities
App: owns the selected location and the weather data (Module 9+: also the search status)

- CitySelector (Module 8) / LocationSearch (Module 9+): chooses a location
- CurrentConditions: temperature, feels-like, humidity, wind, condition
- ForecastList: renders one ForecastCard per day with map and a stable key
- ForecastCard: one day's high, low, condition, precipitation chance
- StatusMessage (Module 9+): loading, not-found, error; uses aria-live
- Attribution (Module 9+): "Weather data by Open-Meteo.com" link and a CC BY 4.0 license link near the data
- SavedLocations (Module 10): saved locations persisted in localStorage

## Data
- Module 8: import src/data/mockWeather.json (synthetic values). Show a
  visible "Sample data" label. Do not fetch.
- Weather codes: use describeWeather() from src/data/weatherCodes.js.
  Do not invent mappings. Always show the text label; icons are decoration.
- Module 9+: geocoding at https://geocoding-api.open-meteo.com/v1/search
  with name, count=5, countryCode=US. If the response has no "results" key,
  treat it as "location not found".
- Module 9+: forecast at https://api.open-meteo.com/v1/forecast with
  temperature_unit=fahrenheit, wind_speed_unit=mph, timezone=auto.
- Module 9: fetch in the search submit handler, not on every keystroke.
- Module 9: use the first geocoding match; display its name and admin1 (state).
- Module 9: disable the search button while a request is in flight.

## Routing (Module 10)
- Use react-router. Routes: "/" and "/forecast?lat=&lon=&name=".
- Fetch in an effect keyed on the URL, with cleanup that ignores or aborts
  stale requests.
- Validate lat (-90 to 90) and lon (-180 to 180). If missing or invalid, show
  a message and a link back to search, and do not fetch.

## Accessibility
- One h1 and logical heading order
- Every input has a visible label; every button has text
- Everything works with the keyboard alone, with a visible focus outline
- Status changes are announced through an aria-live region
- Text meets WCAG AA contrast

## Before reporting completion
- Run npm run build and fix any errors
- List which files changed and why
- Explain any new React concept you used in one or two plain sentences
