import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const techStack = [
    'React', 'Redux', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML', 'CSS',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text sm:text-6xl py-3"
          >
            Welcome to Mega Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto"
          >
            This is a mega project that contains multiple features like Todo, Weather, Cart and more.
          </motion.p>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-300 mb-5">Built With</h2>
          </div>
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech}
                className="bg-gray-200 rounded-xl px-4 py-2 text-gray-800 font-medium"
                variants={childVariants}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;