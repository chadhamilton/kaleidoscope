'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo mode - any credentials work
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Shapes - Kaleidoscope inspired */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-kc-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-kc-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-kc-blue/5 rounded-full blur-2xl" />

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 border border-kc-blue/20 rotate-45" />
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-kc-blue/10 rotate-12" />
        <div className="absolute top-1/3 left-1/4">
          <svg viewBox="0 0 100 100" className="w-32 h-32 text-kc-blue/10" fill="currentColor">
            <polygon points="50,0 100,100 0,100" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <svg viewBox="0 0 100 100" className="w-20 h-20 text-kc-blue/10" fill="currentColor">
            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start px-16 text-kc-slate">
          {/* Logo */}
          <div className="mb-12">
            <Logo size="xl" />
          </div>

          {/* Tagline */}
          <h2 className="text-4xl font-light leading-tight mb-6 max-w-md">
            Transform Your Workspace Vision Into Reality
          </h2>
          <p className="text-kc-gray text-lg max-w-md leading-relaxed">
            Your partner in creating inspiring, functional workspaces. Track projects, explore products, and bring your design concepts to life.
          </p>

          {/* Stats */}
          <div className="flex gap-12 mt-16">
            <div>
              <p className="text-3xl font-semibold">500+</p>
              <p className="text-kc-mist text-sm">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">50+</p>
              <p className="text-kc-mist text-sm">Brand Partners</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">98%</p>
              <p className="text-kc-mist text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12 bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-12">
          <Logo size="lg" />
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-kc-slate mb-2">
              Welcome back
            </h2>
            <p className="text-kc-gray">
              Sign in to access your client portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-kc-slate mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-kc-slate mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-kc-mist hover:text-kc-gray transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-kc-cloud text-kc-blue focus:ring-kc-blue"
                />
                <span className="text-sm text-kc-gray">Remember me</span>
              </label>
              <a href="#" className="text-sm text-kc-blue hover:text-kc-blue-dark font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-kc-mist">
            Demo mode: Any credentials will work
          </p>

          <div className="mt-8 pt-8 border-t border-kc-cloud text-center">
            <p className="text-sm text-kc-gray">
              New to Kaleidoscope?{' '}
              <a href="#" className="font-medium text-kc-blue hover:text-kc-blue-dark">
                Contact us to get started
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
