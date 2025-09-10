"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LogOut, Bell, Settings, User, TrendingUp } from "lucide-react"
import SearchBar from "./SearchBar.jsx"
import Filters from "./Filters.jsx"
import ResultsList from "./ResultsList.jsx"

const CodingBackground = () => {
  const [codeLines, setCodeLines] = useState([])

  const codeSnippets = [
    "const learn = () => { return 'knowledge'; }",
    "function explore() { discover(); }",
    "import { wisdom } from 'experience';",
    "class Developer { constructor() { this.grow(); } }",
    "const skills = [...previous, ...new];",
    "async function master() { await practice(); }",
    "export default { passion, dedication };",
    "if (curious) { keepLearning(); }",
    "const future = await buildDreams();",
    "return success.map(effort => reward);",
    "console.log('Hello, World!');",
    "const data = await fetch('/api/knowledge');",
    "useEffect(() => { inspire(); }, []);",
    "const growth = progress * time;",
    "function innovate() { think(); create(); }",
  ]

  useEffect(() => {
    const generateCodeLines = () => {
      const lines = []
      for (let i = 0; i < 15; i++) {
        lines.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 10 + Math.random() * 10,
        })
      }
      setCodeLines(lines)
    }

    generateCodeLines()
    const interval = setInterval(generateCodeLines, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-purple-300/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating code snippets */}
      {codeLines.map((line) => (
        <motion.div
          key={line.id}
          initial={{
            x: `${line.x}vw`,
            y: `${line.y}vh`,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            x: [`${line.x}vw`, `${(line.x + 20) % 100}vw`],
            y: [`${line.y}vh`, `${(line.y + 30) % 100}vh`],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute text-xs font-mono text-purple-400/40 whitespace-nowrap select-none"
        >
          {line.text}
        </motion.div>
      ))}

      {/* Glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(147, 51, 234, 0.1)" : "rgba(59, 130, 246, 0.1)"
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Binary rain effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-xs font-mono text-green-400/20 select-none"
          style={{
            left: `${(i * 5) % 100}%`,
            top: "-10%",
          }}
          animate={{
            y: ["0vh", "110vh"],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "1" : "0")).join("")}
        </motion.div>
      ))}
    </div>
  )
}

const Dashboard = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    difficulty: "all",
    duration: "all",
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)

    // Simulate API call - replace with actual search logic
    // TODO: Integrate with LLM for intelligent resource recommendations
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "React Fundamentals Course",
          description: "Learn the basics of React with hands-on projects",
          type: "course",
          difficulty: "beginner",
          duration: "4 hours",
          rating: 4.8,
          url: "https://example.com/react-course",
        },
        {
          id: 2,
          title: "JavaScript ES6+ Guide",
          description: "Modern JavaScript features and best practices",
          type: "article",
          difficulty: "intermediate",
          duration: "30 min",
          rating: 4.6,
          url: "https://example.com/js-guide",
        },
        {
          id: 3,
          title: "Web Development Bootcamp",
          description: "Complete full-stack development course",
          type: "course",
          difficulty: "advanced",
          duration: "40 hours",
          rating: 4.9,
          url: "https://example.com/bootcamp",
        },
      ]
      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative"
    >
      <CodingBackground />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/20 backdrop-blur-md shadow-lg border-b border-white/10 sticky top-0 z-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Learning Dashboard
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300"
              >
                Welcome back, {user?.name}! 👋
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/20 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/20 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-purple-400/30"
              >
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">{user?.name}</span>
              </motion.div>

              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Courses Completed", value: "12", icon: TrendingUp, color: "from-green-400 to-green-600" },
            { title: "Hours Learned", value: "48", icon: TrendingUp, color: "from-blue-400 to-blue-600" },
            { title: "Certificates Earned", value: "5", icon: TrendingUp, color: "from-purple-400 to-purple-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={statsVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black/20 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{stat.title}</p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-3xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Search Section */}
          <motion.div variants={itemVariants}>
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants}>
            <Filters filters={filters} onFiltersChange={setFilters} />
          </motion.div>

          {/* Results */}
          <motion.div variants={itemVariants}>
            <ResultsList results={results} loading={loading} searchQuery={searchQuery} filters={filters} />
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default Dashboard
