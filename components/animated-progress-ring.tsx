"use client"

import { useEffect, useState } from "react"

interface AnimatedProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
}

export function AnimatedProgressRing({ progress, size = 60, strokeWidth = 4 }: AnimatedProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)

    return () => clearTimeout(timer)
  }, [progress])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  const getColor = (progress: number) => {
    if (progress >= 80) return "#10b981" // green-500
    if (progress >= 60) return "#3b82f6" // blue-500
    if (progress >= 40) return "#f59e0b" // amber-500
    return "#ef4444" // red-500
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="transparent" />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(animatedProgress)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-700">{Math.round(animatedProgress)}%</span>
      </div>
    </div>
  )
}
