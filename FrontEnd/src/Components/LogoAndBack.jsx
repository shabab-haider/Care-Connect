import React from 'react'
import BackButton from './BackButton'
import Logo from './Logo'

const LogoAndBack = () => {
  return (
   <div className="text-center mb-8">
            <div className="flex mb-3">
            <Logo />
            {/* Back to Home */}
        <div className="mt-3">
          <BackButton />
        </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
  )
}

export default LogoAndBack