import React from 'react'
import Logo from './Logo'

const DoctorHeader = () => {
  return (
      <>
          <header className="bg-white shadow-sm">
                          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                              <Logo />
          
                              <div className="w-full flex justify-end items-center">
                                  <div className="flex items-center">
                                      <div className="p-1 mr-2 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                          >
                                              <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                              />
                                          </svg>
                                      </div>
                                      <span className="hidden md:block ml-2 font-medium">Dr. Syed Shabab</span>
                                  </div>
                              </div>
                          </div>
                      </header>
      </>
  )
}

export default DoctorHeader
