import { Bell } from "lucide-react"
import { motion } from "framer-motion"

const NoNotification = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[70vh] text-zinc-300"
    >
      <div className="relative mb-8 p-6 bg-indigo-500/5 rounded-full">
        <Bell className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-indigo-500/10 backdrop-blur-sm"
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30" />
      </div>
      <h3 className="text-xl font-medium mb-3 text-white">
        No notifications yet
      </h3>
      <p className="text-sm text-zinc-400 max-w-[250px] text-center">
        When you receive notifications, they'll appear here
      </p>
    </motion.div>
  )
}

export default NoNotification
