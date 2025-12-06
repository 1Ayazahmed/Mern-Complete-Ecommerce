import React from 'react'

const Verify = () => {
  return (
     <div className="flex items-center justify-center min-h-screen bg-[#161616]">
      <div className="bg-[#1f1f1f] border border-gray-700 shadow-xl rounded-xl p-6 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-600/20 text-green-400 rounded-full p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-green-400 mb-2">Check Your Email</h2>
        <p className="text-gray-400 text-sm">
          We've sent you an email to verify your account. Please check your inbox and click the verification link.
        </p>
      </div>
    </div>
  )
}

export default Verify;