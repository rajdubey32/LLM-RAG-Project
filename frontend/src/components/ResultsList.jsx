"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import ResourceCard from "./ResourceCard.jsx"
import { Search } from "lucide-react" // Import Search component

const ResultsList = ({ results, loading, searchQuery, filters }) => {
  // Filter results based on selected filters
  const filteredResults = results.filter((result) => {
    if (filters.type !== "all" && result.type !== filters.type) return false
    if (filters.difficulty !== "all" && result.difficulty !== filters.difficulty) return false
    // Add more filter logic as needed
    return true
  })

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
        <p className="text-gray-600">Searching for resources...</p>
      </motion.div>
    )
  }

  if (!searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Learning Journey</h3>
        <p className="text-gray-500">Search for topics you want to learn about</p>
      </motion.div>
    )
  }

  if (filteredResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-12 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Results Found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
        <p className="text-gray-600">
          Found {filteredResults.length} resources for "{searchQuery}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredResults.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ResultsList
