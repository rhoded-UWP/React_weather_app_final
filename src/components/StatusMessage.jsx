// Tells the user what the search is doing.
// Props:
//   status - 'idle', 'locating', 'loading', 'not-found', 'invalid-zip',
//            'error', or 'success' (owned by App)
//
// The messages for each status. Success has no message, because the
// weather itself appears on screen.
const messages = {
  idle: 'Enter a city or ZIP code to see the weather.',
  locating: 'Finding location...',
  loading: 'Loading weather...',
  'not-found': 'No location matched. Check the spelling or try a ZIP code.',
  'invalid-zip': 'ZIP codes must have five digits. Check the number and try again.',
  error: 'Weather could not be loaded. Check your connection and try again.',
  success: '',
}

export default function StatusMessage({ status }) {
  // aria-live="polite" makes screen readers read the new text whenever it
  // changes, once they finish what they are saying. The <p> is always on the
  // page, even when empty, because screen readers only watch live regions
  // that were already there before the text changed.
  return (
    <p className="status-message" aria-live="polite">
      {messages[status]}
    </p>
  )
}
