import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Case study drafts hold internal notes outside the publish markers.
// If a marker goes missing, src/cases would publish the wrong slice of the
// file, so stop the build (and dev server) instead.
const CASE_FILES = ['content/ignitia-case-study.md']
const MARKERS = ['<!-- publish:start -->', '<!-- publish:end -->']

function checkPublishMarkers() {
  return {
    name: 'check-publish-markers',
    buildStart() {
      for (const file of CASE_FILES) {
        const text = readFileSync(file, 'utf8')
        const [start, end] = MARKERS.map((m) => text.indexOf(m))
        for (const [i, pos] of [start, end].entries()) {
          if (pos === -1) this.error(`${file}: missing ${MARKERS[i]}`)
          if (text.indexOf(MARKERS[i], pos + 1) !== -1) this.error(`${file}: ${MARKERS[i]} appears more than once`)
        }
        if (end < start) this.error(`${file}: publish:end comes before publish:start`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [checkPublishMarkers(), react()],
})
