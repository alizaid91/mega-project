import { motion } from 'framer-motion'
import React from 'react'

const Home = () => {
  return (
    <div className='text-center min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
      <motion.h1
        className="text-4xl pb-2 px-4 font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Mega Project
      </motion.h1>
      <motion.p
        className="text-lg text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        This is a mega project that contains multiple features like Todo, Weather, Cart and more.
      </motion.p>
    </div>
  )
}

export default Home