'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our platform today"
    >
      <SignupForm />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-gray-400 text-sm"
      >
        <p>
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition">
            Sign in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
