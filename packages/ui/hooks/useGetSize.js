'use client'

import { useState, useEffect } from 'react'

const useGetSize = () => {
  const [screenHeight, setScreenHeight] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)

  const updateDimensions = () => {
    const screenHeight = window.innerHeight
    const screenWidth = window.innerWidth
    setScreenHeight(screenHeight)
    setScreenWidth(screenWidth)
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return {
    height: screenHeight,
    width: screenWidth
  }
}

export default useGetSize
