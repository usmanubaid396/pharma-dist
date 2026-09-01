'use client';

import React from 'react';
import { Scene } from '@/components/3d/Scene';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-sm">{subtitle}</p>
          )}
        </motion.div>

        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
    </div>
  );
}
