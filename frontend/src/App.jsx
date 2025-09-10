"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LandingPage from "./components/LandingPage"
import Auth from "./components/AuthForm"
import Dashboard from "./components/Dashboard"
import "./styles/global.css"

function App() {
  console.log("[v0] App component rendering")

  const [currentPage, setCurrentPage] = useState("landing") // landing, auth, dashboard
  const [user, setUser] = useState(null)

  const handleGetStarted = () => {
    setCurrentPage("auth")
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("landing")
  }

  const handleBackToLanding = () => {
    setCurrentPage("landing")
  }

  console.log("[v0] Current page:", currentPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {currentPage === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Auth onAuthSuccess={handleAuthSuccess} onBack={handleBackToLanding} />
          </motion.div>
        )}

        {currentPage === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
