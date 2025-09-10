"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle, Users, Zap, Shield } from "lucide-react"

const Auth = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        })
      }
    }

    // Load Google Identity Services script
    if (!window.google) {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogleAuth
      document.head.appendChild(script)
    } else {
      initializeGoogleAuth()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call - replace with actual authentication logic
    setTimeout(() => {
      const userData = {
        id: 1,
        email: email,
        name: email.split("@")[0],
      }
      onAuthSuccess(userData)
      setLoading(false)
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setGoogleLoading(true)

    if (window.google) {
      // Trigger Google One Tap or popup
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup if One Tap is not available
          window.google.accounts.oauth2
            .initTokenClient({
              client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
              scope: "email profile",
              callback: (response) => {
                if (response.access_token) {
                  fetchGoogleUserInfo(response.access_token)
                } else {
                  setGoogleLoading(false)
                  console.error("Google OAuth failed")
                }
              },
            })
            .requestAccessToken()
        }
      })
    } else {
      // Fallback simulation if Google script not loaded
      setTimeout(() => {
        const userData = {
          id: 2,
          email: "user@gmail.com",
          name: "Google User",
          provider: "google",
          picture: "https://via.placeholder.com/100",
        }
        onAuthSuccess(userData)
        setGoogleLoading(false)
      }, 1500)
    }
  }

  const handleGoogleResponse = async (response) => {
    setGoogleLoading(true)

    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split(".")[1]))

      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        provider: "google",
        picture: payload.picture,
        verified: payload.email_verified,
      }

      onAuthSuccess(userData)
    } catch (error) {
      console.error("Error processing Google response:", error)
    } finally {
      setGoogleLoading(false)
    }
  }

  const fetchGoogleUserInfo = async (accessToken) => {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
      const userInfo = await response.json()

      const userData = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        provider: "google",
        picture: userInfo.picture,
        verified: userInfo.verified_email,
      }

      onAuthSuccess(userData)
    } catch (error) {
      console.error("Error fetching Google user info:", error)
    } finally {
      setGoogleLoading(false)
    }
  }

  const codeSnippets = [
    "const learn = () => { return 'knowledge'; }",
    "function discover() { return 'insights'; }",
    "let growth = 'exponential';",
    "import { wisdom } from 'experience';",
    "export default success;",
    "async function achieve() { await goals; }",
  ]

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  const previewVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300/20 font-mono text-sm select-none"
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-100px`,
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/6 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
      />

      <div className="flex w-full max-w-6xl gap-8 relative z-10">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/10"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.h2
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-2xl font-bold text-white"
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {/* ... existing Google button content ... */}
              <AnimatePresence mode="wait">
                {googleLoading ? (
                  <motion.div
                    key="google-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Connecting...
                  </motion.div>
                ) : (
                  <motion.div
                    key="google-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/40 text-gray-300">Or continue with email</span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants} className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-white placeholder-gray-400"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                whileFocus={{ scale: 1.02 }}
                className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-white placeholder-gray-400"
                required
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {/* ... existing button content ... */}
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Please wait...
                    </motion.div>
                  ) : (
                    <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {isLogin ? "Sign In" : "Sign Up"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <motion.button
              onClick={() => setIsLogin(!isLogin)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={previewVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex flex-col justify-center flex-1 text-white pl-8"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              What awaits you inside
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Join thousands of learners who are accelerating their growth with AI-powered learning resources.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: Zap,
                title: "AI-Powered Search",
                description: "Find exactly what you need with intelligent search and voice commands",
                color: "text-yellow-400",
              },
              {
                icon: Users,
                title: "Community Learning",
                description: "Connect with peers, share insights, and learn together",
                color: "text-blue-400",
              },
              {
                icon: Shield,
                title: "Personalized Dashboard",
                description: "Track your progress and get recommendations tailored to you",
                color: "text-green-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`${feature.color} mt-1`}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 ml-auto opacity-60" />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-8 p-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-400">Live Activity</span>
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">2,847</span> learners are currently exploring new resources
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Auth
