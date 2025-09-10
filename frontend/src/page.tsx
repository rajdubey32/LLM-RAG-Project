"use client"

import { ErrorBoundary } from "react-error-boundary"

// Import the main App component from the Vite-style React project
import App from "../src/App"

// Import the global styles
import "../src/index.css"

function ErrorFallback({ error }: { error: Error }) {
  console.log("[v0] Error in app:", error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-red-500 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

export default function Page() {
  console.log("[v0] Page component rendering")

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  )
}
