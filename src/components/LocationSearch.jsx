import { useState } from 'react'

// A search form for a city name or a US ZIP code.
// Props:
//   onSearch - function to call with the trimmed search text when the form is submitted
//   disabled - when true, turns off the Search button (the text box still works)
// The text in the box lives in this component's own state, because nothing
// else needs it until the user submits.
export default function LocationSearch({ onSearch, disabled = false }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    // Stop the browser from reloading the page, which is what a form does by default.
    event.preventDefault()

    const text = query.trim()
    // Ignore a search that is empty or only spaces.
    if (text === '') return

    onSearch(text)
  }

  return (
    <form className="location-search" onSubmit={handleSubmit}>
      <label htmlFor="location-search-input">City or ZIP code</label>
      <div className="location-search-row">
        {/* A "controlled" input: its value comes from state, and every
            keystroke updates that state. */}
        <input
          id="location-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" disabled={disabled}>
          Search
        </button>
      </div>
    </form>
  )
}
