'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Scene } from '@/components/3d/Scene';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Pharma Distribution
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience a modern pharmaceutical distribution platform with an interactive 3D interface. Seamless, secure, and stunning.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg transition"
              >
                Sign In
              </motion.button>
            </Link>

            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gray-400 rounded-lg font-semibold text-white hover:bg-gray-800 transition"
              >
                Create Account
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10" />
    </div>
  );
}
