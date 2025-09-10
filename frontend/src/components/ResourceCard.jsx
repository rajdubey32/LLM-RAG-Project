"use client"
import { motion } from "framer-motion"
import { ExternalLink, Clock, Star, BookOpen, Video, FileText, Book } from "lucide-react"

const ResourceCard = ({ resource }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "article":
        return <FileText className="w-5 h-5" />
      case "book":
        return <Book className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 text-purple-600">
          {getTypeIcon(resource.type)}
          <span className="text-sm font-medium capitalize">{resource.type}</span>
        </div>
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{resource.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
          {resource.difficulty}
        </span>
        <div className="flex items-center space-x-1 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{resource.duration}</span>
        </div>
      </div>

      <motion.a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center space-x-2 w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        <span>View Resource</span>
        <ExternalLink className="w-4 h-4" />
      </motion.a>
    </motion.div>
  )
}

export default ResourceCard
