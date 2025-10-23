import { useState } from "react";
import AuthSvg from '../assets/Auth.svg'


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left side: Branding / illustration */}
      <div className="hidden lg:flex flex-1 bg-blue-600 text-white flex-col justify-center items-center p-20">
        <div className="text-5xl font-bold mb-6">Chatter</div>
        <p className="text-lg text-white/90 mb-10">
          Connect instantly. Chat seamlessly. Share effortlessly.
        </p>
        {/* Illustration placeholder */}
        <div className="w-80 h-80 bg-white/20 rounded-2xl flex items-center justify-center">
            <img src={AuthSvg} alt="Authentication Illustration" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Right side: Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Form Header */}
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {isLogin ? "Sign in to Chatter" : "Create an Account"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isLogin
              ? "Enter your credentials to continue"
              : "Fill in the details to register"}
          </p>

          {/* Toggle Login/Register */}
          <div className="flex justify-end mb-4 text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          {/* Optional Links */}
          {isLogin && (
            <div className="text-right mt-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
              Forgot password?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
