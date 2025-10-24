import { useState } from "react";
import AuthSvg from '../assets/Auth.svg'
import LoginGif from '../assets/Login.gif'
import axios from 'axios'
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {

  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [name , setName] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [error , setError] = useState("");
  const [verificationCode , setVerificationCode] = useState("");
  const [issent , setIssent] = useState(false);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    // Proceed with form submission
    const url = isLogin ? `${import.meta.env.SERVER_URL}/api/users/login` : `${import.meta.env.SERVER_URL}/api/users/register`;
    const payload = isLogin ? { email, password } : { name, email, password };
  
    axios.post(url, payload)
      .then(response => {
        setIssent(true);
        const {user ,message , token} = response.data;
        if(isLogin && user){
          login(user, token);
          toast.success("Login successful");
        }
        toast.success(message);
      })
      .catch(err => {
        console.error("Error:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : "An error occurred");
      });
  };

  //handel verification code
  const handleVerifyCode= (e)=>{
    e.preventDefault();
    //verify code logic here
    axios.post(`${import.meta.env.SERVER_URL}/api/users/verify`, { email, verificationCode })
      .then(response => {
        toast.success(response.data.message);
      })
      .catch(err => {
        console.error("Verification error:", err.response ? err.response.data : err.message);
        toast.error(err.response ? err.response.data.message : "An error occurred");
      });
  }

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
          {error && <p className="text-sm text-red-500 mb-6">{error}</p>}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

            {issent && 
              <div className="flex flex-col items-center">
                <p className="text-sm text-green-500 mt-2">Verification code sent to Email!</p>
                <form className="w-full mt-4">
                  <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    type="submit"
                    onClick={handleVerifyCode}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4"
                  >
                    Verify Code
                  </button>
                </form>
              </div>
            }

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
