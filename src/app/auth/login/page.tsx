'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <LoginForm />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-gray-400 text-sm"
      >
        <p>
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-pink-400 hover:text-pink-300 font-medium transition">
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
